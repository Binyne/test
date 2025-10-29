import multer from "multer";

// Lưu file tạm ở /uploads để Cloudinary đọc được
const upload = multer({ dest: "uploads/" });

export const uploadSingleImage = upload.single("image");
