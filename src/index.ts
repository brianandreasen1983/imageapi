import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path'
import ImageValidator from './utilities/imageValidator';
import ImageProcessor from './utilities/imageProcessor';
import FileSystem from './utilities/fileSystem';


const app = express();
const port = 3000;

app.get('/api', (_req: Request, res: Response) => {
    res.status(200);
    res.send('Hello World');
});

app.get('/api/image', async (req: Request, res: Response) => {
    const imageValidator = new ImageValidator();
    const imageProcessor = new ImageProcessor();
    const fileSystem = new FileSystem();

    const imagename = String(req.query.imagename);
    const height = Number(req.query.height);
    const width = Number(req.query.width);

    if(!imageValidator.isWidthValid(width)) {
        res.status(400);
        res.send('width query parameter is required.');
    }

    if(!imageValidator.isHeightValid(height)) {
        res.status(400);
        res.send('height query parameter is required');
    }

    if(!imageValidator.isImageNameValid(imagename)) {
        res.status(400);
        res.send('imagename query parameter is required.');
    }

    if(!imageValidator.isImageFileExtensionValid(imagename)){
        res.status(400);
        res.send('No file extension in the imagename. Please supply a valid image file extension.');
    }
    else {
        const resizedImageExists = fileSystem.isImageExists(`.${path.sep}savedimages${path.sep}resizedimages${path.sep}${imagename}`);
        if(resizedImageExists) {
            res.status(200);
            res.sendFile(`${imagename}`, {root: `.${path.sep}savedimages${path.sep}resizedimages` });
        } else {
            const savedImageExists = fileSystem.isImageExists(`.${path.sep}savedimages${path.sep}${imagename}`);
            if(savedImageExists) {
                fs.readFile(`.${path.sep}savedimages${path.sep}${imagename}`, async (error, data) => {
                    if(error) {
                        console.log(error);
                        res.status(404);
                        res.send('The saved image requested does not exist.');
                    } else {
                        await imageProcessor.resizeImageAsync(data, width, height, imagename).then(() => {
                            res.status(200);
                            res.sendFile(`${imagename}`, {root: './savedimages/resizedimages' })   
                        });
                    }
                });
            } else {
                res.status(404);
                res.send('The imagename requested does not exist.');
            }
        }
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

export default app;