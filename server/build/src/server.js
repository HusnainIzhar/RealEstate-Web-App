"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_config_1 = require("./config/db.config");
require("dotenv").config();
const cloudinary_config_1 = require("./config/cloudinary.config");
//cloudinary config
(0, cloudinary_config_1.cloudinaryConnect)();
//connect server
app_1.app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    (0, db_config_1.connectDB)();
});
