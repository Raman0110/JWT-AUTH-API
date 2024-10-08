import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoute);

mongoose.connect("mongodb://localhost:27017/restapi")
  .then(() => {
    app.listen(8000, () => {
      console.log('Server running');
    })
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(err.message);
  })
