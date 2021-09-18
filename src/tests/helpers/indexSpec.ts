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

    // it('image api endpoint fails without any supplied parameters', () => {
    //     return request.get('/api/image').then((response) => {
    //         expect(response.status).toBe(400);
    //     });
    // });

        // it('image api endpoint returns 400 when a width query parameter value is 0.', () => {
    //     return request.get('/api/image').query({
    //         width: 0,
    //         height: 200,
    //         imagename: 'fjord.jpg',
    //     }).then((response) => {
    //         expect(response.status).toBe(400);
    //     }).catch((error) => {
    //         console.log('ERROR', error);
    //     });
    // });

    // it('image api endpoint returns 400 when a height query parameter value is 0.', () => {
    //     return request.get('/api/image').query({
    //         width: 200,
    //         height: 0,
    //         imagename: 'fjord.jpg'
    //     }).then((response) => {
    //         expect(response.status).toBe(400);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // });

    // it('image api endpoint returns 400 when a imagename query parameter value is blank.', () => {
    //     return request.get('/api/image').query({
    //         width: 200,
    //         height: 200,
    //         imagename: '',
    //     }).then((response) => {
    //         expect(response.status).toBe(400);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // });

    // it('image api endpoint returns that the file cant be found if it does not exist', () => {
    //     return request.get('/api/image').query({
    //         width:200,
    //         height: 200,
    //         imagename: 'test.jpg'
    //     }).then((response) => {
    //         expect(response.status).toBe(404);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // });

});