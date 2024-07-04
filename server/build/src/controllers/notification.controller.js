"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotification = exports.getNotification = void 0;
const notification_model_1 = require("../models/notification.model");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const catchAsyncErrors_utils_1 = require("../utils/catchAsyncErrors.utils");
const node_cron_1 = __importDefault(require("node-cron"));
//get All notifications
exports.getNotification = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const notifications = await notification_model_1.Notification.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 500));
    }
});
//update notification 
exports.updateNotification = (0, catchAsyncErrors_utils_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const notification = await notification_model_1.Notification.findById(req.params.id);
        if (!notification) {
            return next(new errorHandler_utils_1.default('Notification not found', 404));
        }
        else {
            notification.read = true;
            await notification.save();
            const notifications = await notification_model_1.Notification.find().sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                notifications
            });
        }
    }
    catch (error) {
        return next(new errorHandler_utils_1.default(error.message, 500));
    }
});
//delete notification
node_cron_1.default.schedule("0 0 0 * * *", async () => {
    try {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        await notification_model_1.Notification.deleteMany({ read: true, createdAt: { $lt: weekAgo } });
    }
    catch (error) {
        console.log(error.message);
    }
});
