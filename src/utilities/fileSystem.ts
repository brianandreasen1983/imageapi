/** FileReader is a class used to read files using the fs module within nodeJS */
import e from 'express';
import fs from 'fs';

export default class FileSystem {
    /** isPathExists returns true if the file path exists for the image, false otherwise.
     * @param filePath
     * @returns boolean
     */
    isPathExists = (filePath: string): boolean => {
        if (fs.existsSync(filePath)) {
            return true;
        } else {
            return false;
        }
    };

    /** removeFileAsyn takes in a fully qualified file path it will return true if the file has been deleted. */
    removeFileAsync = (filePath: string): boolean => {
        fs.unlink(filePath, (err) => {
            if (err) {
                return false;
            }
        });

        return true;
    };
}
