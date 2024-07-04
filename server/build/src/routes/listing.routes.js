"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const listing_controller_1 = require("../controllers/listing.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const listingRouter = express.Router();
listingRouter.post("/add-listing", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, listing_controller_1.uploadListing);
listingRouter.put("/edit-listing/:id", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, listing_controller_1.editListing);
listingRouter.get("/listings", listing_controller_1.getAllListings);
listingRouter.get("/listing/:id", listing_controller_1.getSingleListing);
listingRouter.get("/get-listing", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, (0, auth_middleware_1.isAuthorized)("admin"), listing_controller_1.getListing);
listingRouter.delete("/delete-listing/:id", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, (0, auth_middleware_1.isAuthorized)("admin"), listing_controller_1.deleteListing);
listingRouter.delete("/delete-listing-user/:id", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, listing_controller_1.deleteListingUser);
exports.default = listingRouter;
