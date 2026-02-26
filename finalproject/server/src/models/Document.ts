import mongoose from "mongoose"
import crypto from "crypto"

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    shareId: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Document", documentSchema)