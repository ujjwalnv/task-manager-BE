import { PrismaClient, Prisma } from '@prisma/client';
import express from 'express'
import { constants } from 'http2';
import { sendTaskAssignedMail } from '../mailer/assignedTaskMailer';

const router = express.Router();
const prisma = new PrismaClient();

// Create Task API
router.post('/', async (req, res) => {
    const { title, description, dueDate, assignees } = req.body;
    const user_id = req.get('user_id')
    if(!user_id || !title || !description || !dueDate || !assignees || assignees.length === 0)
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'Mandatory fields are missing.' });

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          dueDate,
          creator: { connect: { id: parseInt(user_id) } },
          assignees: { connect: assignees.map((id: number) => ({ id })) },
        },
      });

      // Send email to Assignees
      sendTaskAssignedMail(title, assignees);
      return res.json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Unable to create task' });
    }
  });

// Get Tasks Assigned to a User API
router.get('/assigned', async (req, res) => {
    const userId = req.get("user_id");
    if(!userId) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'User ID is missing in the request headers.' });
    }
  
    try {
        const tasks = await prisma.task.findMany({
          where: { assignees: { some: { id: parseInt(userId) } } },
        });
        return res.json(tasks);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error);
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Unable to fetch assigned tasks.' });
      }
  });
  

// Get Tasks Created by a User API
router.get('/created', async (req, res) => {
    const userId = req.get("user_id");
    
    if(!userId) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'User ID is missing in the request header' });
    }

    try {
      const tasks = await prisma.task.findMany({
        where: { creatorId: parseInt(userId) },
      });
      return res.json(tasks);
    } catch (error) {
      console.error('Error fetching created tasks:', error);
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Unable to fetch created tasks' });
    }
  });

// Filter Tasks API
router.get('/filter', async (req, res) => {
    const dueDate = req.query['dueDate'];
    const creatorId = req.query['creatorId'];
    const assigneeId = req.query['assigneeId'];
    
    if(dueDate){
        if(typeof(dueDate) !== "string")
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'Due date is wrong' });
    }

    if(creatorId){
        if(typeof(creatorId) !== "string")
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'Due date is wrong' });
    }

    if(assigneeId){
        if(typeof(assigneeId) !== "string")
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ error: 'Due date is wrong' });
    }
    const queryData: Prisma.TaskWhereInput = {}

    if(dueDate) queryData.dueDate = new Date(dueDate);
    if(creatorId) queryData.creatorId= parseInt(creatorId);
    if(assigneeId) queryData.assignees = { some:{ id: parseInt(assigneeId) } }

    try {
      const tasks = await prisma.task.findMany({
        where: queryData,
      });
      return res.json(tasks);
    } catch (error) {
      console.error('Error filtering tasks:', error);
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Unable to filter tasks' });
    }
  });

export default router;