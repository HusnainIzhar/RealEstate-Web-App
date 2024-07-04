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
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = express.Router();
userRouter.post("/signup", user_controller_1.signUp);
userRouter.post("/activate", user_controller_1.activateUser);
userRouter.post("/login", user_controller_1.login);
userRouter.get("/logout", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, user_controller_1.logout);
userRouter.get("/refresh", user_controller_1.updateAccessToken);
userRouter.get("/me", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, user_controller_1.getUserInfo);
userRouter.put("/update-profile-info", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, user_controller_1.updateProfileInfo);
userRouter.put("/update-avatar", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, user_controller_1.updateAvatar);
userRouter.post("/social-auth", user_controller_1.socialAuth);
userRouter.put("/update-password", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, user_controller_1.updatePassword);
userRouter.post("/check", user_controller_1.userCheck);
userRouter.get("/get-users", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, (0, auth_middleware_1.isAuthorized)("admin"), user_controller_1.getAllUsers);
userRouter.put("/update-role/:id", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, (0, auth_middleware_1.isAuthorized)("admin"), user_controller_1.updateUserRole);
userRouter.delete("/delete-user/:id", user_controller_1.updateAccessToken, auth_middleware_1.isAuthenticated, (0, auth_middleware_1.isAuthorized)("admin"), user_controller_1.deleteUser);
exports.default = userRouter;
