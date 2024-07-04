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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
//emailRegex for email @ validation
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//User Schema
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        match: [emailRegex, "Please enter a valid email address"],
    },
    password: {
        type: String,
        minlength: [6, "Your password must be longer than 6 characters"],
        select: false,
    },
    profile: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Profile",
    },
    accountType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    listings: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "Listing",
        }],
}, { timestamps: true });
//Hash Password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt_1.default.hash(this.password, 10);
    return next();
});
//sign access token
userSchema.methods.signAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: "5m"
    });
};
//sign refresh token
userSchema.methods.signRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET || "", {
        expiresIn: "3d"
    });
};
//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt_1.default.compare(enteredPassword, this.password);
};
exports.User = mongoose_1.default.model("User", userSchema);
