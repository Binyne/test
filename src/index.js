import dotenv from "dotenv";
dotenv.config();

import connectDB from "./configs/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
