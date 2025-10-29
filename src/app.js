import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

// import route
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js"
import materialRoute from "./routes/material.route.js";
import sexRoute from "./routes/sex.route.js"
import roleRoute from "./routes/role.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/materials", materialRoute)
app.use("/sex", sexRoute)
app.use("/role", roleRoute)

// fallbacks
app.use(notFound);
app.use(errorHandler);

export default app;
