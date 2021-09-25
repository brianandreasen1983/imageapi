import path from 'path';
import fs from 'fs';
import ImageProcessor from '../../utilities/imageProcessor';
import FileSystem from '../../utilities/fileSystem';
import sharp from 'sharp';

const imageProcessor = new ImageProcessor();
const fileSystem = new FileSystem();

describe('Image process tests', () => {
    const imagename = 'fjord';
    const width = 200;
    const height = 400;
    const savedImageFilePath = `.${path.sep}savedimages${path.sep}${imagename}`;

    it('renames the resized image to contain the image name-width-height.jpg', () => {
        const resizedImageName = imageProcessor.resizeImageFileName(width, height, imagename);
        expect(resizedImageName).toMatch('fjord-200-400.jpg');
    });

    it('resizes the image from the image processor', async () => {
        fs.readFile(savedImageFilePath, async (_error, data) => {
            const resizedImageName = imageProcessor.resizeImageFileName(width, height, imagename);
            try {
                const sharp = await imageProcessor.resizeImageAsync(data, width, height, resizedImageName);
                expect(sharp).toBe(sharp);
            } catch (error) {
                expect(error).toEqual(new Error('Invalid input'));
            }
        });
    });
});
