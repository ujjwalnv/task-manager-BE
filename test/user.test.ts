import request from 'supertest'
import {taskManagerApp} from '../src/index';

describe('Create user API', () => {
    it('should create a new user', async () => {
        // Change userData everytime before test for it to be unique
        const userData = {
            name: 'Sample User 3',
            email: 'sampleuser3@email.com'
          };

        const response = await request(taskManagerApp)
            .post('/user')
            .send(userData)
            .expect(200)

        expect(response.body.message).toBe('User Create successfully') 
    })

    it('should give a 404 Bad Request error', async () => {
        const userData = {
            name: 'Sample User', // Email is missing
          };

        const response = await request(taskManagerApp)
            .post('/user')
            .send(userData)
            .expect(400)

        expect(response.body.message).toBe('Username/Email is missing!') 
    })
})