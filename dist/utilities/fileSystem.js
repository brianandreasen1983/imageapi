"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** FileReader is a class used to read files using the fs module within nodeJS */
var fs_1 = __importDefault(require("fs"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
        /** isDirectoryExists returns a true if the directory exists false otherwise.
         * @param directoryPath
         * @returns boolean
         */
        this.isDirectoryExists = function (directoryPath) {
            if (fs_1.default.existsSync(directoryPath)) {
                return true;
            }
            else {
                return false;
            }
        };
        /** isImageExists returns true if the file exists for the image, false otherwise.
         * @param filePath
         * @returns boolean
         */
        this.isImageExists = function (filePath) {
            if (fs_1.default.existsSync(filePath)) {
                return true;
            }
            else {
                return false;
            }
        };
    }
    return FileSystem;
}());
exports.default = FileSystem;
