import mongoose, { Schema, models, model } from 'mongoose';

export interface IHomeLead extends mongoose.Document {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service?: string;
  source: string; // Specific source like 'Home Page', 'Contact Form', etc.
  type: 'B2B'; // Lead type for categorization
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  meta?: Record<string, unknown>;
  createdAt: Date;
}

const HomeLeadSchema = new Schema<IHomeLead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true },
    source: { type: String, required: true, default: 'Home Page' },
    type: { type: String, required: true, default: 'B2B', enum: ['B2B'] },
    pagePath: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.HomeLead as mongoose.Model<IHomeLead> | undefined) || model<IHomeLead>('HomeLead', HomeLeadSchema);
