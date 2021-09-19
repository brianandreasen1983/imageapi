/** ImageValidator is used to hold all of the functions to validate an image based on its query parameters. */

export default class ImageValidator {
    /** isWidthValid validates whether the number is 0 or undefined.
     * @params width
     * @returns boolean
     */
    isWidthValid = (width: number): boolean => {
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
    isHeightValid = (height: number): boolean => {
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
    isImageNameValid = (imagename: string): boolean => {
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
    isImageFileExtensionValid = (imagename: string): boolean => {
        const fileExtension = imagename.split('.');
        if(fileExtension[1] != 'jpg') {
            return false;
        } else {
            return true;
        }
    };
}
