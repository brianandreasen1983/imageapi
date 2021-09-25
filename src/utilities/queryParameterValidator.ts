/** QueryParameterValidator is used to hold all of the functions to validate an image based on its query parameters. */

export default class QueryParameterValidator {
    /** isHeightWidthValid validates whether the number is 0 or undefined.
     * @params width
     * @returns boolean
     */
    isHeightWidthValid = (heightOrWidth: number): boolean => {
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
    isImageNameValid = (imagename: string): boolean => {
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
    isValidNumber = (queryParameter: number): boolean => {
        if (isNaN(queryParameter) || queryParameter <= 0) {
            return false;
        } else {
            return true;
        }
    };
}
