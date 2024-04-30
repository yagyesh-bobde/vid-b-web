/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
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
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var Button_1 = require("~/components/ui/Button");
var helpers_1 = require("~/lib/helpers");
var Page = function () {
    var _a = react_1.useState({
        isLoading: false,
        message: ""
    }), loading = _a[0], setloading = _a[1];
    var router = navigation_1.useRouter();
    var _b = react_1.useState(""), videoUrl = _b[0], setvideoUrl = _b[1];
    var getJobStatus = function (accessToken, jobId) { return __awaiter(void 0, void 0, Promise, function () {
        var isJobDone, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/transcript/job/status", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            accessToken: accessToken,
                            jobId: jobId
                        })
                    })];
                case 1:
                    isJobDone = _a.sent();
                    return [4 /*yield*/, isJobDone.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res.status];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data_1, response, _a, accessToken, conversationId, jobId, status, transcription, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setloading({
                        isLoading: true,
                        message: "Converting to audio..."
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, fetch("/api/transcript/audio", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                url: videoUrl
                            })
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _b.sent();
                    setloading({
                        isLoading: false,
                        message: ""
                    });
                    setloading({
                        isLoading: true,
                        message: "Generating transcription..."
                    });
                    return [4 /*yield*/, fetch("/api/transcript/job/start", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                url: data_1.path,
                                id: data_1.id // video id
                            })
                        })];
                case 4:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    _a = _b.sent(), accessToken = _a.accessToken, conversationId = _a.conversationId, jobId = _a.jobId;
                    if (!accessToken || !conversationId || !jobId) {
                        setloading({
                            isLoading: false,
                            message: "Something went wrong. Please try again."
                        });
                        return [2 /*return*/];
                    }
                    console.log("conv", conversationId);
                    console.log("job", jobId);
                    return [4 /*yield*/, helpers_1["default"].isJobDone(accessToken, jobId)];
                case 6:
                    status = _b.sent();
                    _b.label = 7;
                case 7:
                    if (!(status === "in_progress")) return [3 /*break*/, 10];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, getJobStatus(accessToken, jobId)];
                case 9:
                    status = _b.sent();
                    return [3 /*break*/, 7];
                case 10:
                    if (status !== "completed") {
                        setloading({
                            isLoading: false,
                            message: "Something went wrong. Please try again."
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, helpers_1["default"].getTranscription(accessToken, conversationId)];
                case 11:
                    transcription = _b.sent();
                    // TODO: CREATE DB ENTRY FOR THE VIDEO,CONVERSATION AND TRANSCRIPTION
                    setloading({
                        isLoading: true,
                        message: "Navigating to Video page..."
                    });
                    // navigation
                    setTimeout(function () {
                        router.push("/video/" + data_1.id);
                    }, 1000);
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _b.sent();
                    setloading({
                        isLoading: false,
                        message: "Something went wrong. Please try again."
                    });
                    setvideoUrl("");
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "relative grid h-screen place-content-center bg-black" },
        loading.isLoading && (react_1["default"].createElement("div", { className: "absolute left-0 top-0 h-screen w-screen bg-black opacity-50" }, react_1["default"].createElement("p", { className: "text-center text-white" }, loading.message))),
        react_1["default"].createElement("div", { className: "flex-col-center-center z-10 gap-5" },
            react_1["default"].createElement("input", { type: "text", placeholder: "YouTube Video Url", value: videoUrl, className: "w-[450px] rounded-full px-4 py-3", onChange: function (e) { return setvideoUrl(e.target.value); } }),
            react_1["default"].createElement(Button_1["default"], { className: "bg-white", onClick: handleSubmit }, "Generate"))));
};
exports["default"] = Page;
