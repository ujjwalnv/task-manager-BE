import express from 'express'
import { PORT } from './constants/env_constants';
import { PrismaClient } from '@prisma/client';
import bodyParser from "body-parser";
import { constants } from "http2";

const prisma = new PrismaClient();
const app = express()
app.use(bodyParser.json())

// To check if server is up and running
app.get('/ping', (req, res) => {
    res.send({message: 'pong'});
})

// Create a user
app.post('/user', async (req, res) => {
    try {
        const user_email = req.body.email;
        const user_name = req.body.name;

        if(!user_email || !user_name) return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({message: "Username/Email is missing!"})

        await prisma.user.create({
        data: {
            name: user_name,
            email: user_email,
          }
        })

        return res.send({message: "User Create successfully"});
    } catch (error) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({message: error});
    }
})


//Server Initialized
if (import.meta.env?.PROD) {
    app.listen(PORT, () => {
      console.log("App is running on port:", PORT);
    });
  }
  
export const surveySenseApp = app;