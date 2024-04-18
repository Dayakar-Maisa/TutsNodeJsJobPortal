//Swagger Documentation
import swaggerui from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//packages import
//const express = require('express');
import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
//security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Files Import
import connectDB from "./config/db.js";
//Routes Import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 5500;

// Dot ENV config
dotenv.config();

//Mongodb Connection

connectDB();

//Swagger API config
//Swagger API options
const options = {
  definition: {
    openai: "3.1.0",
    info: {
      title: "Job Portal Application",
      description: "A nodejs expressJs job portal application",
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Validation Middleware
app.use(errorMiddleware);

//Routes

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerui.serve, swaggerui.setup(spec));

app.listen(PORT, () => {
  //console.log(`app started running on Port: ${PORT}`);
});
