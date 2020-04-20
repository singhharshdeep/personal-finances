require('dotenv').config();
const User = require('../../models/User');
const controller = require('../../api/controllers/auth.controller');

const { connectTestDb, closeDbConnection } = require('../../utils/test.utils');

describe('Authentication', () => {
    
    it('tests database connection', async () => {
        await User.sync({ force: true });
        await User.create({
            firstName: 'Test', lastName: 'User',
            email: 'test@email.com', password: 'password',
            salt: 'salt', provider: 'email'
        });
    });

    it('tries sign up with an existing email', async () => {
        const req = {
            body: {
                email: 'test@email.com',
                password: 'password',
                fullName: 'Test User'
            }
        };
        const res = {
            json: body => body
        };

        const response = await controller.signup(req, res, null);

        expect(response).toHaveProperty('error', `A user with email ${req.body.email} already exists`);
    });

    it('tries signing up new user', async () => {
        const req = {
            body: {
                email: 'new_user@email.com',
                password: 'password',
                fullName: 'New Test User'
            }
        };
        const res = {
            status: val => val,
            json: body => body
        };

        const response = await controller.signup(req, res, null);
        expect(response).toHaveProperty('email', req.body.email);
    });
});