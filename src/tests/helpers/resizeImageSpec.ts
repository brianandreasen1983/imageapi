import path from 'path';
import fs from 'fs';
import ImageProcessor from '../../utilities/imageProcessor';
import FileSystem from '../../utilities/fileSystem';
import sharp from 'sharp';

const imageProcessor = new ImageProcessor();
const fileSystem = new FileSystem();

describe('resize image test', () => {
    const imagename = 'fjord.jpg';
    const width = 200;
    const height = 400;
    const savedImageFilePath = `.${path.sep}savedimages${path.sep}${imagename}`;
    const resizedImageFilePath = `.${path.sep}savedimages${path.sep}resizedimages${path.sep}${imagename}`;
    const resizedImagePathExists = fileSystem.isPathExists(resizedImageFilePath);
});
