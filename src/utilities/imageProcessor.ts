/** ImageProcessor is a module that is set to export a single function at this time for resizeImageAsync
 *  this file can be modified in its structure to hold more than one function if needed.
 */
import sharp, { OutputInfo } from 'sharp';

export default class ImageProcessor {
    /** resizeImageAsync resizes a passed in image.
     * @params data
     * @params width
     * @params height
     * @params imagename
     * @returns OutputInfo
     */
    resizeImageAsync = async (data: Buffer, width: number, height: number, imagename: string): Promise<OutputInfo> => {
        const resizedImageName = this.resizeImageFileName(width, height, imagename);
        // return await sharp(data).resize({ width, height }).toFile(`savedimages/resizedimages/${resizedImageName}`);
        return await sharp(data).resize({ width, height }).toFile(`savedimages/resizedimages/${resizedImageName}`);
    };

    /** renameImage renames the image so that it provides a naming convention for the resized file name */
    resizeImageFileName = (width: number, height: number, imagename: string): string => {
        const resizedImageName = `${imagename.split('.')[0]}-${width}-${height}.jpg`;
        return resizedImageName;
    };
}
