"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = exports.OTPToken = void 0;
require("dotenv").config();
const redis_config_1 = require("../config/redis.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//create activation token
const OTPToken = (user) => {
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user, OTP
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    return { token, OTP };
};
exports.OTPToken = OTPToken;
// Parse environment variables
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", 10);
// Options for token
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
};
// Options for refresh token
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
};
const sendToken = async (user, statusCode, res) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();
    // Upload session to redis
    redis_config_1.redis.set(user._id, JSON.stringify(user));
    // Cookie options
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        accessToken,
        user,
    });
};
exports.sendToken = sendToken;
