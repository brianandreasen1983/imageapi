'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var path_1 = __importDefault(require('path'));
var imageProcessor_1 = __importDefault(require('../../utilities/imageProcessor'));
var fileSystem_1 = __importDefault(require('../../utilities/fileSystem'));
var imageProcessor = new imageProcessor_1.default();
var fileSystem = new fileSystem_1.default();
describe('resize image test', function () {
    var imagename = 'fjord.jpg';
    var width = 200;
    var height = 400;
    var savedImageFilePath = '.' + path_1.default.sep + 'savedimages' + path_1.default.sep + imagename;
    var resizedImageFilePath =
        '.' +
        path_1.default.sep +
        'savedimages' +
        path_1.default.sep +
        'resizedimages' +
        path_1.default.sep +
        imagename;
    var resizedImagePathExists = fileSystem.isPathExists(resizedImageFilePath);
});
