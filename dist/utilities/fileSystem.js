'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
        /** isPathExists returns true if the file path exists for the image, false otherwise.
         * @param filePath
         * @returns boolean
         */
        this.isPathExists = function (filePath) {
            if (fs_1.default.existsSync(filePath)) {
                return true;
            } else {
                return false;
            }
        };
        /** removeFileAsyn takes in a fully qualified file path it will return true if the file has been deleted. */
        this.removeFileAsync = function (filePath) {
            fs_1.default.unlink(filePath, function (err) {
                if (err) {
                    return false;
                }
            });
            return true;
        };
    }
    return FileSystem;
})();
exports.default = FileSystem;
