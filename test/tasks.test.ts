import request from 'supertest'
import {taskManagerApp} from '../src/index'; // Assuming your Express app is exported from app.ts

describe('Create Task API', () => {
//   it('should create a new task', async () => {
//     const taskData = {
//       title: 'Sample Task 1234',
//       description: 'This is a sample task',
//       dueDate: '2024-02-07T12:00:00Z',
//       assignees: [1, 2],
//     };

//     const response = await request(taskManagerApp)
//       .post('/tasks')
//       .set('creator_id', '3')
//       .send(taskData)
//       .expect(200);

//     // Verifying if provided title is same as the response title
//     expect(response.body.title).toBe(taskData.title);
//   });

  it('should return 400 if required fields are missing', async () => {
    const invalidTaskData = {
      description: 'This is an invalid task',
    };

    await request(taskManagerApp)
      .post('/tasks')
      .send(invalidTaskData)
      .expect(400); 
  });
});

describe('Get Assigned Tasks API', () => {
    it('should give assigned tasks for the user_id',async () => {
        const response = await request(taskManagerApp)
          .get('/tasks/assigned')
          .set('user_id', '2')
          .expect(200)
    })

    it('should return 400 if required fields are missing',async () => {
        const response = await request(taskManagerApp)
          .get('/tasks/assigned') // Removed user_id from header
          .expect(400)
    })
})

describe('Get Created Tasks API', () => {
    it('should give created tasks for the user_id',async () => {
        const response = await request(taskManagerApp)
          .get('/tasks/created')
          .set('user_id', '1')
          .expect(200)
    })

    it('should return 400 if required fields are missing',async () => {
        const response = await request(taskManagerApp)
          .get('/tasks/created') // Removed user_id from header
          .expect(400)
    })
})
