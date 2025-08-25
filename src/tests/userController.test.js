const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.model');

describe('User Controller', () => {
  beforeAll(async () => {
    await User.deleteMany(); // Clean up before tests
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get user by ID', async () => {
    const user = await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com'
    });
    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('testuser');
  });
});
