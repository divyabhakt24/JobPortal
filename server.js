//API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// importing 
// const express = require('express');
import express from "express";

import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";

//file import
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
//security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddlewares.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//configure env
dotenv.config();

//mongodb
connectDB();

//Swagger api config
const options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application"
        },
        servers: [
            {
                url: "https://localhost:8080",
            },
        ],
    }, apis: ['./routes/*.js'],
};

const spec = swaggerDoc(options)


//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);

//homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));


//validate middlewares
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});