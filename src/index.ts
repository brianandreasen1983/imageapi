import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import QueryParameterValidator from './utilities/queryParameterValidator';
import ImageProcessor from './utilities/imageProcessor';
import FileSystem from './utilities/fileSystem';
import sharp from 'sharp';
const app = express();
const port = 3000;

app.get('/api', (_req: Request, res: Response) => {
    res.status(200);
    res.send('Hello World');
});

app.get('/api/image', async (req: Request, res: Response, next) => {
    const imageValidator = new QueryParameterValidator();
    const imageProcessor = new ImageProcessor();
    const fileSystem = new FileSystem();

    const imagename = `${req.query.imagename as string}.jpg`;
    const height = parseInt(req.query.height as string);
    const width = parseInt(req.query.width as string);

    if (!imageValidator.isValidNumber(width)) {
        return res.status(400).send('query parameter width is not a number.');
    }

    if (!imageValidator.isValidNumber(height)) {
        return res.status(400).send('query parameter height is not a number.');
    }

    if (!imageValidator.isHeightWidthValid(width)) {
        return res.status(400).send('width query parameter is required.');
    }

    if (!imageValidator.isHeightWidthValid(height)) {
        return res.status(400).send('height query parameter is required');
    }

    if (!imageValidator.isImageNameValid(imagename)) {
        return res.status(400).send('imagename query parameter is required.');
    } else {
        const resizedImageName = imageProcessor.resizeImageFileName(width, height, imagename);
        const resizedImagePath = `.${path.sep}savedimages${path.sep}resizedimages${path.sep}${resizedImageName}`;
        const savedImagePath = `.${path.sep}savedimages${path.sep}${imagename}`;
        const resizedImageExists = fileSystem.isPathExists(resizedImagePath);

        if (resizedImageExists) {
            return res.status(200).sendFile(resizedImageName, {
                root: `.${path.sep}savedimages${path.sep}resizedimages`,
            });
        } else {
            const savedImageExists = fileSystem.isPathExists(savedImagePath);

            if (savedImageExists) {
                fs.readFile(`${savedImagePath}`, async (error, data) => {
                    if (error) {
                        throw error;
                    } else {
                        const resizedImageName = imageProcessor.resizeImageFileName(width, height, imagename);
                        await imageProcessor.resizeImageAsync(data, width, height, resizedImageName);
                        return res.status(200).sendFile(`${resizedImageName}`, {
                            root: `.${path.sep}savedimages${path.sep}resizedimages`,
                        });
                    }
                });
            } else {
                return res.status(404).send('The requested image does not exist.');
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export default app;
