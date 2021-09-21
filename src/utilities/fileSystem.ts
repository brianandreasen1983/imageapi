/** FileReader is a class used to read files using the fs module within nodeJS */
import fs from 'fs';

export default class FileSystem {
    /** isDirectoryExists returns a true if the directory exists false otherwise.
     * @param directoryPath
     * @returns boolean
     */
    isDirectoryExists = (directoryPath: string): boolean => {
    if (fs.existsSync(directoryPath)) {
        return true;
    } else {
        return false;
      }
    }

    /** isImageExists returns true if the file exists for the image, false otherwise.
     * @param filePath
     * @returns boolean
     */
    isImageExists = (filePath: string): boolean => {
    if (fs.existsSync(filePath)) {
        return true;
    } else {
        return false;
        }
    }
}