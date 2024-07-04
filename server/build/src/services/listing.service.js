"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllListingsServices = void 0;
const listings_model_1 = require("../models/listings.model");
//get all listing
const getAllListingsServices = async (res) => {
    const listings = await listings_model_1.Listing.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        listings
    });
};
exports.getAllListingsServices = getAllListingsServices;
