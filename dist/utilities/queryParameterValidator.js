'use strict';
/** QueryParameterValidator is used to hold all of the functions to validate an image based on its query parameters. */
Object.defineProperty(exports, '__esModule', { value: true });
var QueryParameterValidator = /** @class */ (function () {
    function QueryParameterValidator() {
        /** isHeightWidthValid validates whether the number is 0 or undefined.
         * @params width
         * @returns boolean
         */
        this.isHeightWidthValid = function (heightOrWidth) {
            if (heightOrWidth === 0 || heightOrWidth === undefined) {
                return false;
            } else {
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
            } else {
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
            } else {
                return true;
            }
        };
    }
    return QueryParameterValidator;
})();
exports.default = QueryParameterValidator;
