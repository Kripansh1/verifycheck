import mongoose, { Schema, models, model } from 'mongoose';

export interface IB2CLead extends mongoose.Document {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  source: string; // Specific source like 'Employee Verification', 'Profile Verification', etc.
  type: 'B2C'; // Lead type for categorization
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  meta?: Record<string, any>;
  createdAt: Date;
}

const B2CLeadSchema = new Schema<IB2CLead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    service: { type: String, trim: true },
    source: { type: String, required: true, default: 'Employee Verification' },
    type: { type: String, required: true, default: 'B2C', enum: ['B2C'] },
    pagePath: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.B2CLead as mongoose.Model<IB2CLead> | undefined) || model<IB2CLead>('B2CLead', B2CLeadSchema);
