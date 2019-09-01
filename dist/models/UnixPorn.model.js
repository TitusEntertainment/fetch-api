"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timestamp = require("mongoose-timestamp");
const UnixPornSchema = new mongoose_1.Schema({
    data: {
        title: { type: String, required: true },
        body: String,
        url: { type: String, required: true },
        thumbnail: { type: String },
        image: { type: String, required: true },
        subreddit: String,
    },
    timestamp: { type: Date, default: Date.now() },
});
UnixPornSchema.plugin(timestamp);
exports.default = mongoose_1.model('UnixPorn', UnixPornSchema);
