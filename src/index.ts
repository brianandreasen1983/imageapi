import express, { query, Request, Response } from 'express';
import { readFile } from 'fs';
import sharp from 'sharp';

const app = express();
const port = 3000;

app.get('/api', (_req: Request, res: Response) => {
    res.status(200);
    res.send('Hello World');
});

app.get('/api/image', (req: Request, res: Response) => {
    const imagename = req.query.imagename;
    const height = Number(req.query.height);
    const width = Number(req.query.width);

    if(width === 0 || width === undefined) {
        res.status(400);
        res.send('width query parameter is required.');
    } 

    if(height === 0 || height === undefined) {
        res.status(400);
        res.send('height query parameter is required');
    }

    if(imagename === undefined || imagename === '') {
        res.status(400);
        res.send('imagename query parameter is required.');
    } else {
        readFile(`./assets/${imagename}`, async (error, data) => {
            if (error) {
                res.status(400);
                res.send('There was an error processing your request.');
            } else {
                await sharp(data).resize({width, height})
                                .toFile(`assets/resizedImages/${imagename}`)
                                .then(() => {
                                    res.status(200);
                                    res.sendFile(`${imagename}`, {root: './assets/resizedImages' })
                                }).catch(() => {
                                    res.status(400);
                                    res.send(`The requested file could not be found.`);
                                });
            }
        });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

export default app;