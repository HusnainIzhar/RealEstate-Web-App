"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsersServices = exports.getUserById = void 0;
const redis_config_1 = require("../config/redis.config");
const user_model_1 = require("../models/user.model");
//get user by ID
const getUserById = async (id, res) => {
    const userJSON = await redis_config_1.redis.get(id);
    if (userJSON) {
        const user = JSON.parse(userJSON);
        res.status(201).json({
            success: true,
            user,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
};
exports.getUserById = getUserById;
//get All users
const getAllUsersServices = async (res) => {
    const users = await user_model_1.User.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        users,
    });
};
exports.getAllUsersServices = getAllUsersServices;
//update user Role
const updateUserRoleService = async (res, id, role) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json({
        success: true,
        user,
    });
};
exports.updateUserRoleService = updateUserRoleService;
