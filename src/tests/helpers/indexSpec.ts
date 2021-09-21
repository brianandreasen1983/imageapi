import app from '../../index';
import supertest from 'supertest';
import { response } from 'express';

const request = supertest(app);


describe('image api endpoint tests', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    });

    it('image api endpoint returns a resized image when all query parameters are supplied.', async () => {
        return await request.get('/api/image').query({
            width: 200,
            height: 200,
            imagename: 'fjord.jpg',
        }).then((response) => {
            expect(response.status).toBe(200);
        });
    });

    it('excluding image file extension should fail.', async () => {
        return await request.get('/api/image').query({
            width: 200,
            height: 300,
            imagename: 'nono'
        }).then((response) => {
            expect(response.status).toBe(400); 
        });
    });

    it('image that cannot be found should fail.', async () => {
        return await request.get('/api/image').query({
            width: 200,
            height: 300,
            imagename: 'nono.jpg'
        }).then((response) => {
            expect(response.status).toBe(404);
        });
    });

    it('invalid width parameter as a string should fail', async () => {
        return await request.get('/api/image').query({
            width: 'apple',
            height: 200,
            imagename: 'fjord.jpg'
        }).then((response) => {
            expect(response.status).toBe(400);
        });
    });

    it('invalid height parameter as a string should fail', async () => {
        return await request.get('/api/image').query({
            width: 200,
            height: 'iscool',
            imagename: 'fjord.jpg'
        }).then((response) => {
            expect(response.status).toBe(400);
        });
    });

    it('invalid width parameter as a negative number should fail', async () => {
        return await request.get('/api/image').query({
            width: -1,
            height: 200,
            imagename: 'fjord.jpg'
        }).then((response) => {
            expect(response.status).toBe(400);
        });
    });

    it('invalid height parameter as a negative number should fail', async () => {
        return await request.get('/api/image').query({
            width: 200,
            height: -1,
            imagename: 'fjord.jpg'
        }).then((response) => {
            expect(response.status).toBe(400);
        });
    });
});