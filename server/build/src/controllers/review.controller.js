"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviews = exports.addReview = void 0;
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const review_model_1 = require("../models/review.model");
//add Review
exports.addReview = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const reviewData = req.body;
        const { locality, reviewer, stayDuration, positives, negatives, connectivity, lifeStyle, environment, safety, } = reviewData;
        if (!locality ||
            !reviewer ||
            !stayDuration ||
            !connectivity ||
            !lifeStyle ||
            !environment ||
            !safety) {
            return next(new errorHandler_utils_1.default("Please fill all the fields", 400));
        }
        const totalRating = connectivity + lifeStyle + environment + safety;
        const rating = totalRating / 4;
        reviewData.rating = rating;
        let avg = 0;
        const review = await review_model_1.Review.create(reviewData);
        res.status(200).json({
            success: true,
            review,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//get all reviews for Dha Bahawalpur
exports.getAllReviews = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const locality = req.params;
        const reviews = await review_model_1.Review.find({ locality: locality }).sort({
            createdAt: -1,
        });
        const numberOfReviews = reviews.length;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
        res.status(200).json({
            success: true,
            reviews,
            averageRating,
            numberOfReviews,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 500));
    }
});
