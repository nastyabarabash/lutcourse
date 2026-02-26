import mongoose from "mongoose"

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model("Document", documentSchema)