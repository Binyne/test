// src/configs/multer.js
import multer from "multer";
import path from "path";

// Lưu file tạm trong thư mục uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // nhớ tạo folder uploads/ ở root
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + "-" + file.fieldname + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
