"use strict";
/** ImageValidator is used to hold all of the functions to validate an image based on its query parameters. */
Object.defineProperty(exports, "__esModule", { value: true });
var ImageValidator = /** @class */ (function () {
    function ImageValidator() {
        /** isWidthValid validates whether the number is 0 or undefined.
         * @params width
         * @returns boolean
         */
        this.isWidthValid = function (width) {
            if (width === 0 || width === undefined) {
                return false;
            }
            else {
                return true;
            }
        };
        /** isHeightValid validates whether the number is 0 or undefined.
         * @params height
         * @returns boolean
         */
        this.isHeightValid = function (height) {
            if (height === 0 || height === undefined) {
                return false;
            }
            else {
                return true;
            }
        };
        /** isImageNameValid validates whether the number is blank or undefined.
         * @params imagename
         * @returns boolean
         */
        this.isImageNameValid = function (imagename) {
            if (imagename === undefined || imagename === '') {
                return false;
            }
            else {
                return true;
            }
        };
        /** isImageFileExtensionValid validates whether or not the imagename contains a valid .jpg extension
         * @params imagename
         * @returns boolean
         */
        this.isImageFileExtensionValid = function (imagename) {
            var fileExtension = imagename.split('.');
            if (fileExtension[1] != 'jpg') {
                return false;
            }
            else {
                return true;
            }
        };
        /** isValidNumber checks to see if the incoming value as a number from a query parameter is a number or negative value
         * @param queryParameter
         * @returns boolean
         */
        this.isValidNumber = function (queryParameter) {
            if (isNaN(queryParameter) || queryParameter <= 0) {
                return false;
            }
            else {
                return true;
            }
        };
    }
    return ImageValidator;
}());
exports.default = ImageValidator;
