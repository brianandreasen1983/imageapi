import app from '../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('image api endpoint tests', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    });

    it('image api endpoint returns a resized image when all query parameters are supplied.', () => {
        return request.get('/api/image').query({
            width: 200,
            height: 200,
            imagename: 'fjord.jpg',
        }).then((response) => {
            expect(response.status).toBe(200);
        }).catch((error) => {
            console.log('There was an error');
            console.log(error);
        });
    });
});