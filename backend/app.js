import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import authRoutes from "./routes/auth";
import userRouters from "./routes/user";
import orderRouters from "./routes/order";
import cors from "cors";
import cookieParser from "cookie-parser";

//Config
const app = express();
dotenv.config();

//Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connect to database successfully");
  });

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:4001", credentials: true }));
app.use(cookieParser());

//Routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", authRoutes);
app.use("/api", userRouters);
app.use("/api", orderRouters);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
