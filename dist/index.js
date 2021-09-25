'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var fs_1 = __importDefault(require('fs'));
var path_1 = __importDefault(require('path'));
var queryParameterValidator_1 = __importDefault(require('./utilities/queryParameterValidator'));
var imageProcessor_1 = __importDefault(require('./utilities/imageProcessor'));
var fileSystem_1 = __importDefault(require('./utilities/fileSystem'));
var app = (0, express_1.default)();
var port = 3000;
app.get('/api', function (_req, res) {
    res.status(200);
    res.send('Hello World');
});
app.get('/api/image', function (req, res, next) {
    return __awaiter(void 0, void 0, void 0, function () {
        var imageValidator,
            imageProcessor,
            fileSystem,
            imagename,
            height,
            width,
            resizedImageName,
            resizedImagePath,
            savedImagePath,
            resizedImageExists,
            savedImageExists;
        return __generator(this, function (_a) {
            imageValidator = new queryParameterValidator_1.default();
            imageProcessor = new imageProcessor_1.default();
            fileSystem = new fileSystem_1.default();
            imagename = '' + req.query.imagename;
            height = parseInt(req.query.height);
            width = parseInt(req.query.width);
            if (!imageValidator.isValidNumber(width)) {
                return [2 /*return*/, res.status(400).send('query parameter width is not a number.')];
            }
            if (!imageValidator.isValidNumber(height)) {
                return [2 /*return*/, res.status(400).send('query parameter height is not a number.')];
            }
            if (!imageValidator.isHeightWidthValid(width)) {
                return [2 /*return*/, res.status(400).send('width query parameter is required.')];
            }
            if (!imageValidator.isHeightWidthValid(height)) {
                return [2 /*return*/, res.status(400).send('height query parameter is required')];
            }
            if (!imageValidator.isImageNameValid(imagename)) {
                return [2 /*return*/, res.status(400).send('imagename query parameter is required.')];
            } else {
                resizedImageName = imageProcessor.resizeImageFileName(width, height, imagename);
                console.log('RESIZED IMAGE NAME', resizedImageName);
                resizedImagePath =
                    '.' +
                    path_1.default.sep +
                    'savedimages' +
                    path_1.default.sep +
                    'resizedimages' +
                    path_1.default.sep +
                    resizedImageName;
                console.log('RESIZED IMAGE PATH', resizedImagePath);
                savedImagePath = '.' + path_1.default.sep + 'savedimages' + path_1.default.sep + imagename;
                console.log('SAVED IMAGE PATH', savedImagePath);
                resizedImageExists = fileSystem.isPathExists(resizedImagePath);
                console.log('RESIZED IMAGE EXISTS', resizedImageExists);
                // If the resized image exists serve it from the cache.
                // otherwise look to see if the image exists as a saved image
                // resize it
                // save it in the resizedimages directory.
                if (resizedImageExists) {
                    // return res.status(200).sendFile(`${resizedImageName}`, {
                    //     root: `${resizedImagePath}`,
                    // });
                    res.status(200);
                } else {
                    savedImageExists = fileSystem.isPathExists(savedImagePath);
                    console.log('SAVED IMAGE EXISTS', savedImageExists);
                    if (savedImageExists) {
                        console.log('SAVED IMAGE PATH', savedImagePath);
                        fs_1.default.readFile('' + savedImagePath, function (_error, data) {
                            return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [
                                                4 /*yield*/,
                                                imageProcessor
                                                    .resizeImageAsync(data, width, height, imagename)
                                                    .then(function () {
                                                        return res.status(200).sendFile('' + imagename, {
                                                            root:
                                                                '.' +
                                                                path_1.default.sep +
                                                                'savedimages' +
                                                                path_1.default.sep +
                                                                'resizedimages',
                                                        });
                                                    }),
                                            ];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    } else {
                        return [2 /*return*/, res.status(404).send('The requested image does not exist.')];
                    }
                }
            }
            return [2 /*return*/];
        });
    });
});
app.listen(port, function () {
    console.log('Listening on port ' + port);
});
exports.default = app;
