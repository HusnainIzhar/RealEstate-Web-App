"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const ErrorMiddleware = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    //wrong mongodb id error
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    ;
    //Duplicate key error
    if (error.statusCode === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    ;
    //wrong jwt error
    if (error.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try Again!!!`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    ;
    //jwt expired error
    if (error.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired. Try Again!!!`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    ;
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        stack: error.stack
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
