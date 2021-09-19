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
        return await sharp(data).resize({width, height})
                        .toFile(`savedimages/resizedimages/${imagename}`);
    };
}
