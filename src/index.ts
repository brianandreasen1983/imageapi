import express, { Request, Response } from 'express';
import fs from 'fs';
import sharp, { OutputInfo } from 'sharp';

const app = express();
const port = 3000;

/** isWidthValid validates whether the number is 0 or undefined.
 * @params width
 * @returns boolean
 */
const isWidthValid = (width: number): boolean => {
    if(width === 0 || width === undefined) {
        return false;
    } else {
        return true;
    }
};

/** isHeightValid validates whether the number is 0 or undefined.
 * @params height
 * @returns boolean
 */
const isHeightValid = (height: number): boolean => {
    if(height === 0 || height === undefined) {
        return false;
    } else {
        return true;
    }
};

/** isImageNameValid validates whether the number is blank or undefined.
 * @params imagename
 * @returns boolean
 */
const isImageNameValid = (imagename: string): boolean => {
    if(imagename === undefined || imagename === '') {
        return false;
    } else {
        return true;
    }
};

/** isImageFileExtensionValid validates whether or not the imagename contains a valid .jpg extension
 * @params imagename
 * @returns boolean
 */
const isImageFileExtensionValid = (imagename: string): boolean => {
    const fileExtension = imagename.split('.');
    if(fileExtension[1] != 'jpg') {
        return false;
    } else {
        return true;
    }
};

/** resizeImageAsync resizes a passed in image.
 * @params data
 * @params width
 * @params height
 * @params imagename
 * @returns OutputInfo
 */
const resizeImageAsync = async (data: Buffer, width: number, height: number, imagename: string): Promise<OutputInfo> => {
    return await sharp(data).resize({width, height})
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