"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryStorage = exports.cloudinaryConnect = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
require("dotenv").config();
const cloudinaryConnect = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API,
        api_secret: process.env.CLOUD_SECRET_KEY
    });
    if (!cloudinary_1.v2.config().cloud_name) {
        return new errorHandler_utils_1.default("Cloudinary configuration failed", 400);
    }
    ;
    return null;
};
exports.cloudinaryConnect = cloudinaryConnect;
;
exports.cloudinaryStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "profile",
        allowedFormats: ["jpg", "jpeg", "png"]
    }
});
