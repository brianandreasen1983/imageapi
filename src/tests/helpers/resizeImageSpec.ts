import path from 'path';
import fs from 'fs';
import ImageProcessor from '../../utilities/imageProcessor';

const imageProcessor = new ImageProcessor();

describe('resize image test' , () => {
    it('resizes the image based on the parameters provided.', async () => {
        const imagename = 'fjord.jpg';
        const width = 200;
        const height = 200;
        const testFilePath = `.${path.sep}savedimages${path.sep}${imagename}`
        fs.readFile(testFilePath, async (error, data) => {
            if(error) {
                console.log(error);
                // TODO: Send something back to the client like the file doesn't' exist.
            } else {
                const resizedImageName = `fjord-${width}-${height}.jpg`;
                // TODO: Rename the image to a convention like imagename-width-height-imgFileExtension to resize and store in the cache.
                await imageProcessor.resizeImageAsync(data, width, height, resizedImageName).then(() => {
                    console.log('SUCCESS!');
                });
            }
        });
    });
});