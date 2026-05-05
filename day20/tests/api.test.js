const request = require('supertest');
const app = require('../server');

describe('GET /api/activities', () => {

    it('should return 200 OK and an array of activities', async () => {
        const res = await request(app).get('/api/activities');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 429 if rate limit is exceeded', async () => {
        for (let i = 0; i < 110; i++) {
            await request(app).get('/api/activities');
        }

        const res = await request(app).get('/api/activities');
        expect(res.statusCode).toBe(429);
    });

});