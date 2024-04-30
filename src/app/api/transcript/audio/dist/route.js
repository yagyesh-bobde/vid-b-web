"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
exports.POST = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var ytdl_core_1 = require("ytdl-core");
var env_1 = require("~/env");
var helpers_1 = require("~/lib/helpers");
var supabase_1 = require("~/lib/supabase");
var db_1 = require("~/server/db");
var schema_1 = require("~/server/db/schema");
function POST(request) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var reqBody, url, audioStream_1, buffers_1, downloadPromise, result, audioBuffer, videoId, _c, data, error, res, error_1, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    reqBody = _d.sent();
                    url = reqBody.url;
                    audioStream_1 = ytdl_core_1["default"](url, {
                        filter: "audioonly",
                        quality: "highestaudio"
                    });
                    buffers_1 = [];
                    downloadPromise = new Promise(function (resolve, reject) {
                        audioStream_1.on("data", function (data) {
                            buffers_1.push(data);
                        });
                        audioStream_1.on("end", function () {
                            console.log("Audio download complete");
                            resolve(1);
                        });
                        audioStream_1.on("error", function (error) {
                            reject(error);
                        });
                    });
                    return [4 /*yield*/, downloadPromise];
                case 2:
                    result = _d.sent();
                    // If an error occurred during the download, reject the promise
                    if (result instanceof Error) {
                        return [2 /*return*/, Response.json({ error: "Error downloading audio" }, { status: 500 })];
                    }
                    audioBuffer = Buffer.concat(buffers_1);
                    videoId = helpers_1["default"].extractYouTubeVideoId(url);
                    return [4 /*yield*/, supabase_1.supabaseClient.storage.from(env_1.env.SUPABASE_AUDIO_BUCKET_NAME).upload(videoId + ".mp3", audioBuffer)];
                case 3:
                    _c = _d.sent(), data = _c.data, error = _c.error;
                    if (!error) return [3 /*break*/, 5];
                    console.error('Error uploading audio to Supabase:', error.message);
                    return [4 /*yield*/, db_1.db.select().from(schema_1.transcriptions).where(drizzle_orm_1.eq(schema_1.transcriptions.videoId, videoId !== null && videoId !== void 0 ? videoId : url))
                        // const { data } = supabaseClient.storage.from('vid-b-web').getPublicUrl(`${videoId}.mp3`)
                        // console.log("public url", data)
                    ];
                case 4:
                    res = _d.sent();
                    // const { data } = supabaseClient.storage.from('vid-b-web').getPublicUrl(`${videoId}.mp3`)
                    // console.log("public url", data)
                    return [2 /*return*/, new Response(JSON.stringify({ message: "ok", path: (_a = res[0]) === null || _a === void 0 ? void 0 : _a.audioUrl, id: (_b = res[0]) === null || _b === void 0 ? void 0 : _b.videoId }), {
                            headers: { "Content-Type": "application/json" }
                        })];
                case 5:
                    console.log('Audio uploaded successfully!');
                    console.log(data);
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, db_1.db.insert(schema_1.transcriptions).values({
                            audioUrl: data.path,
                            videoId: videoId !== null && videoId !== void 0 ? videoId : url
                        })];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _d.sent();
                    console.log("already entry exists");
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/, new Response(JSON.stringify({ message: "ok", path: data.path, id: videoId !== null && videoId !== void 0 ? videoId : url }), {
                        headers: { "Content-Type": "application/json" }
                    })];
                case 10:
                    error_2 = _d.sent();
                    console.error("Error processing request:", error_2);
                    return [2 /*return*/, new Response(JSON.stringify({ error: "Internal Server Error" }), {
                            status: 500,
                            headers: { "Content-Type": "application/json" }
                        })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
