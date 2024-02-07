import express from 'express'
import { PORT } from './constants/env_constants';
import { PrismaClient } from '@prisma/client';
import bodyParser from "body-parser";
import { constants } from "http2";
import userRoute from "./routes/userRoute";
import taskRoute from "./routes/taskRoute";

const prisma = new PrismaClient();
const app = express()
app.use(bodyParser.json())

// To check if server is up and running
app.get('/ping', (req, res) => {
    res.send({message: 'pong'});
})

// User routes
app.use('/user', userRoute)
// Task routes
app.use('/tasks', taskRoute)



//Server Initialized
if (import.meta.env?.PROD) {
    app.listen(PORT, () => {
      console.log("App is running on port:", PORT);
    });
  }
  
export const taskManagerApp = app;