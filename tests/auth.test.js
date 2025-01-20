const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
  });
});
