"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.userCheck = exports.updatePassword = exports.socialAuth = exports.updateProfileInfo = exports.updateAvatar = exports.getUserInfo = exports.updateAccessToken = exports.logout = exports.login = exports.activateUser = exports.signUp = void 0;
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const user_model_1 = require("../models/user.model");
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailSender_utils_1 = require("../utils/mailSender.utils");
const cloudinary_1 = __importDefault(require("cloudinary"));
const tokens_utils_1 = require("../utils/tokens.utils");
const redis_config_1 = require("../config/redis.config");
const tokens_utils_2 = require("../utils/tokens.utils");
const ejs_1 = __importDefault(require("ejs"));
const profile_model_1 = require("../models/profile.model");
const path_1 = __importDefault(require("path"));
const user_service_1 = require("../services/user.service");
require("dotenv").config();
//signup user
exports.signUp = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { name, email, password, accountType } = req.body;
        if (!name || !email || !password) {
            return next(new errorHandler_utils_1.default("Please fill all the fields", 400));
        }
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return next(new errorHandler_utils_1.default("User already exists", 400));
        }
        const user = {
            name,
            email,
            password,
            accountType,
        };
        const activationToken = (0, tokens_utils_2.OTPToken)(user); //otp & user
        const activationOTP = activationToken.OTP;
        const data = { name: { name: user.name }, activationOTP };
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../views/mail-templates/", "activationMail.ejs"), data);
        try {
            await (0, mailSender_utils_1.sendEmail)({
                email: user.email,
                subject: "Account Activation",
                template: "activationMail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
                activationToken: activationToken.token,
            });
        }
        catch (error) {
            return next(new errorHandler_utils_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
exports.activateUser = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.JWT_SECRET);
        if (newUser.OTP !== activation_code) {
            return next(new errorHandler_utils_1.default("Invalid activation code", 400));
        }
        const { name, email, password } = newUser.user;
        const user = await user_model_1.User.create({
            name,
            email,
            password,
        });
        const image = `https://ui-avatars.com/api/?background=random&name=${name}`;
        const profile = await profile_model_1.Profile.create({ user: user._id, image: { url: image } });
        user.profile = profile._id;
        await user.save();
        res.status(201).json({
            success: true,
            message: "Account activated successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//login user
exports.login = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorHandler_utils_1.default("Please enter email and password", 400));
        }
        const userExist = await user_model_1.User.findOne({ email })
            .select("+password")
            .populate("profile listings");
        if (!userExist) {
            return next(new errorHandler_utils_1.default("Invalid email or password", 400));
        }
        if (userExist.password === undefined) {
            return next(new errorHandler_utils_1.default("Invalid User - (social-login)", 400));
        }
        const isPasswordMatched = await userExist.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new errorHandler_utils_1.default("Invalid email or password", 400));
        }
        userExist.password = "";
        (0, tokens_utils_1.sendToken)(userExist, 200, res);
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//logout
exports.logout = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = req.user?._id || "";
        // Use await or handle the Promise
        await redis_config_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//update access token
const updateAccessToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        const message = "Couldn't refresh token";
        if (!decoded) {
            return next(new errorHandler_utils_1.default(message, 400));
        }
        const session = await redis_config_1.redis.get(decoded.id);
        if (!session) {
            return next(new errorHandler_utils_1.default(message, 400));
        }
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5min",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "3d",
        });
        req.user = user;
        res.cookie("access_token", accessToken, tokens_utils_1.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, tokens_utils_1.refreshTokenOptions);
        next();
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
};
exports.updateAccessToken = updateAccessToken;
//get user info
exports.getUserInfo = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const userId = req.user._id;
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//update Avatar
exports.updateAvatar = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { image } = req.body;
        const userId = req.user._id;
        if (!image) {
            return next(new errorHandler_utils_1.default("Please upload an image", 400));
        }
        // Fetch the existing profile
        const user = await user_model_1.User.findById(userId).populate("profile listings");
        const profile = await profile_model_1.Profile.findById(user?.profile._id);
        if (!profile) {
            return next(new errorHandler_utils_1.default("Profile not found", 404));
        }
        if (image && profile) {
            if (profile.image && profile.image.public_id) {
                await cloudinary_1.default.v2.uploader.destroy(profile.image.public_id);
                const uploadedImage = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "avatars",
                });
                profile.image = {
                    public_id: uploadedImage.public_id,
                    url: uploadedImage.secure_url,
                };
            }
            else {
                const uploadedImage = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "avatars",
                    width: 150,
                });
                profile.image = {
                    public_id: uploadedImage.public_id,
                    url: uploadedImage.secure_url,
                };
                if (user) {
                    user.profile.image.url = uploadedImage.secure_url;
                }
            }
            await profile.save();
            console.log(user);
            redis_config_1.redis.set(user?._id, JSON.stringify(user));
        }
        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//update profile info
exports.updateProfileInfo = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { name, mobile, whatsapp } = req.body;
        const userId = req.user._id;
        const user = await user_model_1.User.findById(userId).populate("profile listings");
        const profile = await profile_model_1.Profile.findById(user?.profile._id);
        if (!user) {
            return next(new errorHandler_utils_1.default("User not found", 404));
        }
        else {
            if (name && name !== "") {
                user.name = name;
            }
            if (profile) {
                if (mobile && mobile !== "") {
                    profile.mobile = mobile;
                    user.profile.mobile = mobile;
                }
                if (whatsapp && whatsapp !== "") {
                    profile.whatsapp = whatsapp;
                    user.profile.whatsapp = whatsapp;
                }
            }
            await user.save();
            await profile?.save();
            await redis_config_1.redis.set(userId, JSON.stringify(user));
            res.status(200).json({
                success: true,
                message: "Profile updated successfully",
            });
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//social auth
exports.socialAuth = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { email, name, image } = req.body;
        const user = await user_model_1.User.findOne({ email }).populate("profile listings");
        let img;
        if (!user) {
            const newUser = await user_model_1.User.create({ email, name });
            if (!image) {
                img = `https://ui-avatars.com/api/?background=random&name=${name}`;
            }
            else {
                img = image;
            }
            const profile = await profile_model_1.Profile.create({ user: newUser._id, image: { url: img } });
            newUser.profile = profile._id;
            await newUser.save();
            newUser.profile = profile;
            (0, tokens_utils_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, tokens_utils_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//update password
exports.updatePassword = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await user_model_1.User.findById(req.user._id).select("+password");
        if (user?.password === undefined) {
            return next(new errorHandler_utils_1.default("Invalid User", 400));
        }
        const isPasswordMatched = await user?.comparePassword(currentPassword);
        if (!newPassword || !confirmPassword || !currentPassword) {
            return next(new errorHandler_utils_1.default("Please fill all the fields", 400));
        }
        if (newPassword !== confirmPassword) {
            return next(new errorHandler_utils_1.default("Password doesn't match", 400));
        }
        if (!isPasswordMatched) {
            return next(new errorHandler_utils_1.default("Incorrect password", 400));
        }
        user.password = newPassword;
        await user.save();
        await redis_config_1.redis.set(req.user._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//test
exports.userCheck = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    const { email } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        return next(new errorHandler_utils_1.default("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});
//get all users only for Admin
exports.getAllUsers = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        (0, user_service_1.getAllUsersServices)(res);
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//update user Role only-admin
exports.updateUserRole = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { id, role } = req.body;
        (0, user_service_1.updateUserRoleService)(res, id, role);
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
//delete user admin only
exports.deleteUser = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            return next(new errorHandler_utils_1.default("User not found", 404));
        }
        await user.deleteOne({ _id: id });
        await redis_config_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 400));
    }
});
