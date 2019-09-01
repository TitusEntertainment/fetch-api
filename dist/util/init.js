"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.init = () => {
    mongoose_1.default.connect(process.env.CREDENTIALS || 'mongodb://localhost:27017/Rest-Api', {
        useNewUrlParser: true,
        autoIndex: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4,
    });
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connection.on('connected', () => {
        console.info('Client has connected to database');
    });
    mongoose_1.default.connection.on('err', err => {
        console.error(err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.warn('Disconnected from database');
    });
};
