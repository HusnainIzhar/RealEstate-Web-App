"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isAuthenticated = void 0;
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_config_1 = require("../config/redis.config");
// authenticated user
exports.isAuthenticated = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next(new errorHandler_utils_1.default("Login first to access this resource", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return next(new errorHandler_utils_1.default("Access Token is not valid", 401));
        }
        const user = await redis_config_1.redis.get(decoded.id);
        if (!user) {
            return next(new errorHandler_utils_1.default("User not found", 404));
        }
        req.user = JSON.parse(user);
        console.log('AccessToken Expiration Time (Middleware):', new Date(decoded.exp * 1000));
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Handle token expiration error
            return next(new errorHandler_utils_1.default("Access Token has expired", 401));
        }
        else {
            // Handle other errors
            return next(new errorHandler_utils_1.default("Error decoding access token", 401));
        }
    }
});
//validate role
const isAuthorized = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.accountType || '';
        if (!roles.includes(userRole)) {
            return next(new errorHandler_utils_1.default(`Role ${userRole} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.isAuthorized = isAuthorized;
