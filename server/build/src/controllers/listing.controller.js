"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.deleteListingUser = exports.getListing = exports.getAllListings = exports.getSingleListing = exports.editListing = exports.uploadListing = void 0;
const listings_model_1 = require("../models/listings.model");
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const user_model_1 = require("../models/user.model");
const cloudinary_1 = __importDefault(require("cloudinary"));
const redis_config_1 = require("../config/redis.config");
const listing_service_1 = require("../services/listing.service");
//upload listing
exports.uploadListing = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const data = req.body;
        if (data.images) {
            const images = await Promise.all(data.images.map(async (image) => {
                const uploadedImage = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "Gallery",
                });
                return {
                    public_id: uploadedImage.public_id,
                    url: uploadedImage.secure_url,
                };
            }));
            data.images = images;
        }
        const { purpose, propertyType, subPropertyType, city, area, location, price, title, description, contact, name, images, } = data;
        if (!purpose ||
            !propertyType ||
            !area ||
            !price ||
            !title ||
            !description ||
            !contact ||
            !name ||
            !subPropertyType ||
            !city ||
            !location) {
            return next(new errorHandler_utils_1.default("Please fill all the fields", 400));
        }
        const userId = req.user._id;
        const userExist = await user_model_1.User.findById(userId).populate("listings profile");
        if (!userExist) {
            return next(new errorHandler_utils_1.default("User not found", 404));
        }
        const user = userExist;
        data.postedBy = user._id;
        const listing = await listings_model_1.Listing.create(data);
        user.listings.push(listing);
        await user.save();
        await redis_config_1.redis.set(userId, JSON.stringify(user));
        const existingListingsJSON = await redis_config_1.redis.get("allListings");
        let existingListings = existingListingsJSON ? JSON.parse(existingListingsJSON) : [];
        existingListings.push(listing);
        const updatedListingsJSON = JSON.stringify(existingListings);
        await redis_config_1.redis.set("allListings", updatedListingsJSON);
        res.status(200).json({
            message: "Listing created successfully",
            success: true,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//edit listing
exports.editListing = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const listingId = req.params.id;
        const data = req.body;
        const existingListing = await listings_model_1.Listing.findById(listingId);
        if (!existingListing) {
            return next(new errorHandler_utils_1.default("Listing not found", 404));
        }
        const removedImages = existingListing.images.filter((image) => {
            return !data.images.some((newImage) => newImage.public_id === image.public_id);
        });
        console.log("removed", removedImages);
        await Promise.all(removedImages.map(async (image) => {
            await cloudinary_1.default.v2.uploader.destroy(image.public_id);
            console.log(image.public_id);
        }));
        if (data.images) {
            const images = await Promise.all(data.images.map(async (image) => {
                if (typeof image === 'string') {
                    const uploadedImage = await cloudinary_1.default.v2.uploader.upload(image, {
                        folder: "Gallery",
                    });
                    return {
                        public_id: uploadedImage.public_id,
                        url: uploadedImage.secure_url,
                    };
                }
                else {
                    // if image is not a string, return it as is
                    return image;
                }
            }));
            data.images = images;
        }
        const { purpose, propertyType, subPropertyType, city, area, location, price, title, description, contact, name, images, } = data;
        if (!purpose ||
            !propertyType ||
            !area ||
            !price ||
            !title ||
            !description ||
            !images ||
            !contact ||
            !name ||
            !subPropertyType ||
            !city ||
            !location) {
            return next(new errorHandler_utils_1.default("Please fill all the fields", 400));
        }
        const userId = req.user._id;
        const userExist = await user_model_1.User.findById(userId);
        if (!userExist) {
            return next(new errorHandler_utils_1.default("User not found", 404));
        }
        const user = userExist;
        data.postedBy = user;
        const listing = await listings_model_1.Listing.findOneAndUpdate({ _id: listingId }, { $set: data }, { new: true }).lean();
        if (!listing) {
            // Handle the case where no listing was found
            return next(new errorHandler_utils_1.default("Listing not found", 404));
        }
        const updatedListing = {
            ...listing,
            // Add any other necessary properties here
        };
        const propertyIndex = user.listings.findIndex((property) => property._id.toString() === listingId);
        if (propertyIndex !== -1) {
            user.listings[propertyIndex] = updatedListing;
        }
        const updatedUser = await user_model_1.User.findById(userId).populate("listings profile");
        await redis_config_1.redis.set(userId, JSON.stringify(updatedUser));
        await user.save();
        res.status(200).json({
            message: "Listing updated successfully",
            success: true,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//get Single listing
exports.getSingleListing = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const listingId = req.params.id;
        // const isCacheExist = await redis.get(listingId);
        // if (isCacheExist) {
        //   const listing = JSON.parse(isCacheExist);
        //   res.status(200).json({
        //     message: "Listing fetched successfully",
        //     success: true,
        //     listing,
        //   });
        // } else {
        const listing = await listings_model_1.Listing.findByIdAndUpdate(listingId, { $inc: { 'analytics.views': 1 } }, { new: true })
            .populate({
            path: 'postedBy',
            populate: { path: 'profile' }
        })
            .lean();
        // await redis.set(listingId, JSON.stringify(listing));
        await redis_config_1.redis.del("allListings");
        if (!listing) {
            return next(new errorHandler_utils_1.default("Listing not found", 404));
        }
        res.status(200).json({
            message: "Listing fetched successfully",
            success: true,
            listing,
        });
        // }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//get all listings
exports.getAllListings = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const isCacheExist = await redis_config_1.redis.get("allListings");
        if (isCacheExist) {
            const listings = JSON.parse(isCacheExist);
            res.status(200).json({
                message: "Listings fetched successfully",
                success: true,
                listings,
            });
        }
        else {
            const listings = await listings_model_1.Listing.find()
                .populate("postedBy", "name")
                .lean();
            await redis_config_1.redis.set("allListings", JSON.stringify(listings));
            res.status(200).json({
                message: "Listings fetched successfully",
                success: true,
                listings,
            });
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//get all listing only for Admin
exports.getListing = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        (0, listing_service_1.getAllListingsServices)(res);
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//delet listing User only
exports.deleteListingUser = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const listing = await listings_model_1.Listing.findById(id);
        const user = req.user;
        if (!listing) {
            return next(new errorHandler_utils_1.default("Listing not found", 404));
        }
        else {
            if (listing.postedBy.toString() !== userId.toString()) {
                return next(new errorHandler_utils_1.default("You are not authorized to delete this listing", 400));
            }
            for (const image of listing.images) {
                await cloudinary_1.default.v2.uploader.destroy(image.public_id);
            }
            await listing.deleteOne({ _id: id });
            await user_model_1.User.findByIdAndUpdate(userId, { $pull: { listings: id } });
            const updatedUser = await user_model_1.User.findById(userId).populate("listings profile");
            await redis_config_1.redis.set(userId, JSON.stringify(updatedUser));
            await redis_config_1.redis.del(id);
            res.status(200).json({
                success: true,
                message: "Listing deleted Successfully",
            });
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//delete listing admin only
exports.deleteListing = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await listings_model_1.Listing.findById(id);
        if (!listing) {
            return next(new errorHandler_utils_1.default("Listing not found", 404));
        }
        for (const image of listing.images) {
            await cloudinary_1.default.v2.uploader.destroy(image.public_id);
        }
        await listing.deleteOne({ id });
        const userId = listing.postedBy.toString();
        const updatedUser = await user_model_1.User.findById(userId).populate("listings profile");
        await redis_config_1.redis.set(userId, JSON.stringify(updatedUser));
        await redis_config_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "Listing deleted Successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
