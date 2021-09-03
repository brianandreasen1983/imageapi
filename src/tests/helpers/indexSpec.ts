import app from '../../index';
import supertest from 'supertest';

const request = supertest(app);
describe('Test endpoint', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    }
)});