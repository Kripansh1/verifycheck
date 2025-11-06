import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import HomeLead from '../../../models/HomeLead';
import { sendLeadEmail } from '../../../lib/mailer';
import { validateBusinessEmail } from '../../../lib/emailValidation';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic CORS handling for cross-origin/form submissions
  const origin = req.headers.origin || '';
  const allowedOrigins = new Set([
    'https://www.verifycheck.in',
    'https://verifycheck.in',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]);
  if (allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, X-CSRF-Token'
  );
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    // Preflight
    return res.status(200).end();
  }

  if (req.method === 'HEAD') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, phone, email, company, service, pagePath, utm_source, utm_medium, utm_campaign, meta } = req.body || {};

    // Validate required fields first
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    // Validate business email if provided
    if (email) {
      const emailValidation = validateBusinessEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: emailValidation.message || 'Invalid email address',
          field: 'email'
        });
      }
      if (!emailValidation.isBusiness) {
        return res.status(400).json({
          success: false,
          message: emailValidation.message || 'Business email required. Free email domains (Gmail, Yahoo, Hotmail, etc.) are not accepted for business inquiries.',
          field: 'email'
        });
      }
    }

    // Prepare lead data for email (even if DB fails)
    const leadData = {
      name,
      phone,
      email,
      company,
      service,
      source: 'Home Page',
      type: 'B2B',
      pagePath,
      utm_source,
      utm_medium,
      utm_campaign,
      meta,
      createdAt: new Date(),
    };

    // Try to save to database (non-blocking - don't fail if this fails)
    let savedDoc = null;
    let dbError = null;
    
    try {
      await dbConnect();
      savedDoc = await HomeLead.create(leadData);
      console.log('Lead saved to database successfully:', savedDoc._id);
    } catch (dbSaveError) {
      // Log database error but continue to send email
      dbError = dbSaveError;
      const errorMessage = dbSaveError instanceof Error ? dbSaveError.message : 'Unknown error';
      const errorDetails = dbSaveError instanceof Error ? {
        name: dbSaveError.name,
        message: dbSaveError.message,
        ...(dbSaveError as any).code && { code: (dbSaveError as any).code },
        ...(dbSaveError as any).codeName && { codeName: (dbSaveError as any).codeName },
      } : { error: String(dbSaveError) };
      
      console.error('Database save failed (home POST) - continuing to send email:', errorDetails);
    }

    // Send email notification - this is critical and should always happen
    let emailSent = false;
    let emailError = null;
    
    try {
      // Use saved document if available, otherwise use lead data
      const leadForEmail = savedDoc ? savedDoc.toObject() : leadData;
      
      await sendLeadEmail({
        lead: leadForEmail,
        type: 'home',
      });
      
      emailSent = true;
      console.log('Email sent successfully for home/B2B lead:', {
        leadId: savedDoc?._id || 'no-db-id',
        name,
        email,
      });
    } catch (emailSendError) {
      emailError = emailSendError;
      console.error('Failed to send email for home/B2B lead:', {
        leadId: savedDoc?._id || 'no-db-id',
        error: emailSendError instanceof Error ? emailSendError.message : String(emailSendError),
      });
    }

    // Return success if email was sent, even if DB save failed
    if (emailSent) {
      return res.status(201).json({ 
        success: true, 
        data: savedDoc || leadData,
        warning: dbError ? 'Lead saved but database connection failed. Email was sent successfully.' : undefined
      });
    } else {
      // Email failed - this is a critical error
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email notification',
        error: emailError instanceof Error ? emailError.message : 'Unknown email error',
        dbWarning: dbError ? 'Database save also failed' : undefined
      });
    }
  }

  if (req.method === 'GET') {
    // Simple listing for home leads (optional, for convenience)
    // Connect to DB with proper error reporting
    try {
      await dbConnect();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      const errorDetails = e instanceof Error ? {
        name: e.name,
        message: e.message,
        ...(e as any).code && { code: (e as any).code },
        ...(e as any).codeName && { codeName: (e as any).codeName },
      } : { error: String(e) };
      
      console.error('DB connect failed (home GET):', errorDetails);
      
      let userMessage = 'Database connection failed';
      if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('querySrv')) {
        userMessage = 'Database server not found. Please check your MongoDB connection string.';
      } else if (errorMessage.includes('authentication') || errorMessage.includes('auth')) {
        userMessage = 'Database authentication failed. Please check your credentials.';
      } else if (errorMessage.includes('timeout')) {
        userMessage = 'Database connection timeout. Please check your network connection.';
      }
      
      return res.status(500).json({ 
        success: false, 
        message: userMessage,
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      });
    }

    const { page = '1', limit = '20' } = req.query as { page?: string; limit?: string };
    const p = Math.max(parseInt(page as string) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit as string) || 20, 1), 100);

    try {
      const [items, total] = await Promise.all([
        HomeLead.find({}).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
        HomeLead.countDocuments({}),
      ]);

      return res.status(200).json({ success: true, total, page: p, limit: l, items });
    } catch (error) {
      console.error('List home leads error:', error);
      return res.status(500).json({ success: false, message: 'Failed to list home leads' });
    }
  }

  // Unexpected method; log for diagnostics
  try {
    console.warn('home endpoint received unexpected method:', req.method, 'headers:', req.headers);
  } catch { }
  res.setHeader('Allow', 'GET, POST, OPTIONS, HEAD');
  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

