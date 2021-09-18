import express, { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

const app = express();
const port = 3000;

const isWidthValid = (width: number) => {
    if(width === 0 || width === undefined) {
        return false;
    } else {
        return true;
    }
};

const isHeightValid = (height: number) => {
    if(height === 0 || height === undefined) {
        return false;
    } else {
        return true;
    }
};

const isImageNameValid = (imagename: string) => {
    if(imagename === undefined || imagename === '') {
        return false;
    } else {
        return true;
    }
};

const isImageFileExtensionValid = (imagename: string) => {
    const fileExtension = imagename.split('.');
    if(fileExtension[1] != 'jpg') {
        return false;
    } else {
        return true;
    }
};

const resizeImageAsync = async (data: Buffer, width: number, height: number, imagename: string) => {
    await sharp(data).resize({width, height})
                     .toFile(`assets/resizedImages/${imagename}`);
};

app.get('/api', (_req: Request, res: Response) => {
    res.status(200);
    res.send('Hello World');
});

app.get('/api/image', (req: Request, res: Response) => {
    const imagename = String(req.query.imagename);
    const height = Number(req.query.height);
    const width = Number(req.query.width);

    if(!isWidthValid(width)) {
        res.status(400);
        res.send('width query parameter is required.');
    }

    if(!isHeightValid(width)) {
        res.status(400);
        res.send('height query parameter is required');
    }

    if(!isImageNameValid(imagename)) {
        res.status(400);
        res.send('imagename query parameter is required.');
    }
    else {
        if(!isImageFileExtensionValid(imagename)){
            res.status(400);
            res.send('No file extension in the imagename. Please supply a valid image file extension.');
        }

        fs.readFile(`./assets/resizedImages/${imagename}`, async (error, data) => {
            if(error){
                fs.readFile(`./assets/${imagename}`, async (error, data) => {
                    if (error) {
                        res.status(404);
                        res.send(`The requested file could not be found. ${imagename}`);
                    } else {
                        await resizeImageAsync(data, width, height, imagename).then(() => {
                            res.status(200);
                            res.sendFile(`${imagename}`, {root: './assets/resizedImages' })
                        });
                    }
                });
            } else {
                await resizeImageAsync(data, width, height, imagename).then((() => {
                    res.status(200);
                    res.sendFile(`${imagename}`, {root: './assets/resizedImages' })
                }))
            }
        })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

export default app;