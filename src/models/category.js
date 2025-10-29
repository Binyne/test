import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },        // secure_url
    imagePublicId: { type: String, default: null }, // để xoá ảnh cũ khi update/delete
  },
);

export default mongoose.model("Category", categorySchema);
