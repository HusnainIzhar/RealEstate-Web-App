"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingAnalytics = exports.getUserAnalytics = void 0;
const user_model_1 = require("../models/user.model");
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const analytics_generator_1 = require("../utils/analytics.generator");
const listings_model_1 = require("../models/listings.model");
//get analytics
exports.getUserAnalytics = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const users = await (0, analytics_generator_1.generateLast12MonthsData)(user_model_1.User);
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 500));
    }
});
//get analytics for listing
exports.getListingAnalytics = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const listings = await (0, analytics_generator_1.generateLast12MonthsData)(listings_model_1.Listing);
        res.status(200).json({
            success: true,
            listings,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 500));
    }
});
