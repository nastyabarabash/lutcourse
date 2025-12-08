import mongoose, { Document, Schema } from "mongoose";

interface IOffer extends Document {
  title: string
  description: string
  price: number
  imageId?: string
}

const offerSchema: Schema<IOffer> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String }
});

const Offer = mongoose.model<IOffer>("Offer", offerSchema);

export { Offer };
export type { IOffer };
