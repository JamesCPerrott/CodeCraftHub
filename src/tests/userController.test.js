/**
 * tests/user.controller.test.js
 *
 * This test suite uses Supertest and Jest to test the User controller endpoints.
 * It covers:
 * - Creating a new user
 * - Retrieving a user by ID
 *
 * It interacts with the actual Express app and the MongoDB test database.
 */

const request = require('supertest');           // Supertest allows HTTP assertions for Express apps
const app = require('../src/app');              // Import the Express app
const User = require('../src/models/user.model'); // Import User model for database operations

describe('User Controller', () => {

  /**
   * beforeAll hook
   * Runs once before all tests in this suite.
   * Cleans up the User collection to ensure tests run in a clean state.
   */
  beforeAll(async () => {
    await User.deleteMany(); // Remove all users from the database
  });

  /**
   * Test: Create a new user
   * Sends a POST request to /api/users with user data
   * Expects HTTP 201 status and returned object to have an _id property
   */
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com'
      });

    expect(res.statusCode).toEqual(201);       // Check status code
    expect(res.body).toHaveProperty('_id');    // Check that returned object contains MongoDB _id
  });

  /**
   * Test: Get user by ID
   * First creates a new user directly in the database
   * Sends a GET request to /api/users/:id
   * Expects HTTP 200 status and correct username in the response body
   */
  it('should get user by ID', async () => {
    const user = await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com'
    });

    const res = await request(app).get(`/api/users/${user._id}`);

    expect(res.statusCode).toEqual(200);       // Check status code
    expect(res.body.username).toEqual('testuser'); // Check that username matches
  });
});
