import { PrismaClient } from '@prisma/client';
import express from 'express'
import { constants } from 'http2';

const router = express.Router();
const prisma = new PrismaClient();

// Create a User
router.post('/', async (req, res) => {
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

export default router;