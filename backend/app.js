import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./routes";

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
app.use("/api", routers);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
