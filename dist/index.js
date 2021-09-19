"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var imageValidator_1 = __importDefault(require("./utilities/imageValidator"));
var imageProcessor_1 = __importDefault(require("./utilities/imageProcessor"));
var fileSystem_1 = __importDefault(require("./utilities/fileSystem"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/api', function (_req, res) {
    res.status(200);
    res.send('Hello World');
});
app.get('/api/image', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageValidator, imageProcessor, fileSystem, imagename, height, width, fileExt, resizedImageName_1, resizedImageExists, savedImageExists;
    return __generator(this, function (_a) {
        imageValidator = new imageValidator_1.default();
        imageProcessor = new imageProcessor_1.default();
        fileSystem = new fileSystem_1.default();
        imagename = String(req.query.imagename);
        height = Number(req.query.height);
        width = Number(req.query.width);
        fileExt = '.jpg';
        if (!imageValidator.isWidthValid(width)) {
            res.status(400);
            res.send('width query parameter is required.');
        }
        if (!imageValidator.isHeightValid(height)) {
            res.status(400);
            res.send('height query parameter is required');
        }
        if (!imageValidator.isImageNameValid(imagename)) {
            res.status(400);
            res.send('imagename query parameter is required.');
        }
        if (!imageValidator.isImageFileExtensionValid(imagename)) {
            res.status(400);
            res.send('No file extension in the imagename. Please supply a valid image file extension.');
        }
        else {
            resizedImageName_1 = imagename.split('.')[0] + "-" + width + "-" + height + fileExt;
            resizedImageExists = fileSystem.isImageExists("." + path_1.default.sep + "savedimages" + path_1.default.sep + "resizedimages" + path_1.default.sep + resizedImageName_1);
            if (resizedImageExists) {
                res.status(200);
                res.sendFile("" + resizedImageName_1, { root: "." + path_1.default.sep + "savedimages" + path_1.default.sep + "resizedimages" });
            }
            else {
                savedImageExists = fileSystem.isImageExists("." + path_1.default.sep + "savedimages" + path_1.default.sep + imagename);
                if (savedImageExists) {
                    fs_1.default.readFile("." + path_1.default.sep + "savedimages" + path_1.default.sep + imagename, function (error, data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!error) return [3 /*break*/, 1];
                                    console.log(error);
                                    res.status(404);
                                    res.send('The saved image requested does not exist.');
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, imageProcessor.resizeImageAsync(data, width, height, resizedImageName_1).then(function () {
                                        res.status(200);
                                        res.sendFile("" + resizedImageName_1, { root: './savedimages/resizedimages' });
                                    })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    res.status(404);
                    res.send('The image requested does not exist.');
                }
            }
        }
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("Listening on port " + port);
});
exports.default = app;
