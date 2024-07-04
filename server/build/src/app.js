"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const path_1 = __importDefault(require("path"));
const listing_routes_1 = __importDefault(require("./routes/listing.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const express_rate_limit_1 = require("express-rate-limit");
const routers = [
    notification_routes_1.default,
    user_routes_1.default,
    listing_routes_1.default,
    analytics_routes_1.default,
    reviews_routes_1.default,
];
//body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.join(__dirname, "views/layouts"));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//cookie parser
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    credentials: true,
}));
//rate limit
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
//routes
exports.app.use("/api/v1", routers);
//test route
exports.app.get("/api/v1/test", (req, res, next) => {
    res.status(200).json({
        message: "API wrking",
        success: true,
    });
});
// unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
//rate limit
exports.app.use(limiter);
//error middleware
exports.app.use(error_middleware_1.ErrorMiddleware);
