import path from 'path';
import fs from 'fs';
import ImageProcessor from '../../utilities/imageProcessor';

const imageProcessor = new ImageProcessor();

describe('resize image test' , () => {
    it('resizes the image based on the parameters provided.', async () => {
        const imagename = 'fjord.jpg';
        const width = 200;
        const height = 400;
        const testFilePath = `.${path.sep}savedimages${path.sep}${imagename}`
        fs.readFile(testFilePath, async (error, data) => {
            if(error) {
                console.log(error);
            } else {
                const resizedImageName = `${imagename.split('.')[0]}-${width}-${height}.jpg`;
                await imageProcessor.resizeImageAsync(data, width, height, resizedImageName);
            }
        });
    });
});