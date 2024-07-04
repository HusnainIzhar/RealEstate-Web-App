"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const dbUrl = process.env.DB_URL || "";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(dbUrl)
            .then((data) => {
            console.log(`MongoDB connected to ${data.connection.host}`);
        });
    }
    catch (error) {
        console.log(error.message);
        setTimeout(exports.connectDB, 5000);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
