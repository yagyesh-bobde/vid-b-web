"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
exports.__esModule = true;
var env_1 = require("~/env");
var getFullPath = function (path) {
    return env_1.env.SUPABASE_URL + "/storage/v1/object/public/" + env_1.env.SUPABASE_AUDIO_BUCKET_NAME + "/" + path;
};
function extractYouTubeVideoId(url) {
    // Regular expression to match YouTube video URL patterns
    try {
        var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        // Execute the regular expression on the URL
        var match = url.match(regExp);
        // If there's a match, return the video ID, otherwise return string
        return match ? match[1] : url;
    }
    catch (error) {
        return url;
    }
}
var getAuthToken = function () { return __awaiter(void 0, void 0, Promise, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://api.symbl.ai/oauth2/token:generate", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "type": "application",
                        "appId": env_1.env.SYMBL_ID,
                        "appSecret": env_1.env.SYMBL_SECRET
                    })
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data.accessToken];
        }
    });
}); };
var getConversationId = function (url) { return __awaiter(void 0, void 0, Promise, function () {
    var accessToken, response, responseBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthToken()];
            case 1:
                accessToken = _a.sent();
                if (!accessToken) {
                    // TODO: TOAST TRY AGAIN
                    console.log('no token');
                    return [2 /*return*/, {
                            accessToken: '',
                            conversationId: '',
                            jobId: ''
                        }];
                }
                return [4 /*yield*/, fetch("https://api.symbl.ai/v1/process/audio/url", {
                        method: "POST",
                        headers: {
                            "x-api-key": accessToken,
                            "Authorization": "Bearer " + accessToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": "transcription_" + new Date().getTime(),
                            "url": url,
                            "confidenceThreshold": 0.6,
                            "timezoneOffset": 0,
                            "enableSpeakerDiarization": false,
                            "features": {
                                "featureList": [
                                    "insights",
                                    "callScore"
                                ]
                            }
                        })
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                responseBody = _a.sent();
                // In case failed return empty object
                console.log(responseBody);
                if (responseBody.message) {
                    console.log("failed");
                    console.log(response);
                    return [2 /*return*/, ({
                            accessToken: '',
                            conversationId: '',
                            jobId: ''
                        })];
                }
                return [2 /*return*/, {
                        accessToken: accessToken,
                        conversationId: responseBody.conversationId,
                        jobId: responseBody.jobId
                    }];
        }
    });
}); };
var isJobDone = function (token, jobId) { return __awaiter(void 0, void 0, Promise, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://api.symbl.ai/v1/job/" + jobId, {
                    method: "GET",
                    headers: {
                        "x-api-key": token,
                        "content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                // console.log(data); // data - id, status(completed, failed, in_progress)
                return [2 /*return*/, data.status];
        }
    });
}); };
var getTranscription = function (token, conversationId) { return __awaiter(void 0, void 0, Promise, function () {
    var requestOptions, data, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestOptions = {
                    method: "POST",
                    headers: {
                        "x-api-key": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contentType: "text/markdown",
                        showSpeakerSeparation: false
                    })
                };
                return [4 /*yield*/, fetch("https://api.symbl.ai/v1/conversations/" + conversationId + "/transcript", requestOptions)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                json = _a.sent();
                return [2 /*return*/, json.transcript.payload];
        }
    });
}); };
var functions = {
    getAuthToken: getAuthToken,
    getConversationId: getConversationId,
    isJobDone: isJobDone,
    getTranscription: getTranscription,
    extractYouTubeVideoId: extractYouTubeVideoId,
    getFullPath: getFullPath
};
exports["default"] = functions;
