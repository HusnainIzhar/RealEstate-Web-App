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
exports.Listing = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Profile Schema
const listingSchema = new mongoose_1.Schema({
    purpose: {
        type: String,
        enum: ["rent", "sale"],
        required: true,
    },
    propertyType: {
        type: String,
        enum: ["residential", "commercial", "plot"],
        required: true,
    },
    subPropertyType: {
        type: String,
        enum: [
            "residentialPlot",
            "commercialPlot",
            "agricultureLand",
            "plotFile",
            "office",
            "shop",
            "warehouse",
            "building",
            "house",
            "flat",
            "upperPortion",
            "lowerPortion",
            "room",
            "hostel",
            "other",
        ],
        required: true,
    },
    city: {
        type: String,
        enum: [
            "karachi",
            "lahore",
            "bahawalpur",
            "islamabad",
            "rawalpindi",
            "multan",
            "faisalabad",
            "hyderabad",
            "gawadar",
            "quetta",
            "peshawar",
            "sialkot",
            "gujranwala",
            "abbottabad",
            "sargodha",
            "sahiwal",
            "gujrat",
            "sukkur",
            "hyederabad",
            "jhelum",
            "muzaffarabad",
            "mirpur",
            "mardan",
            "kohat",
            "deraIsmailKhan",
            "deraGhaziKhan",
        ],
        required: true,
    },
    area: {
        type: {
            type: String,
            enum: ["marla", "sqft", "sqyd", "kanal"],
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: String,
    },
    bathrooms: {
        type: String,
    },
    features: [
        {
            type: {
                type: String,
            },
            value: {
                type: String,
            },
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    coverImage: {
        type: Number,
        default: 0,
    },
    contact: {
        type: Number,
    },
    whatsapp: {
        type: Number,
    },
    name: {
        type: String,
    },
    analytics: {
        views: {
            type: Number,
            default: 0,
        },
        locations: [
            { type: String }
        ]
    },
    postedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.Listing = mongoose_1.default.model("Listing", listingSchema);
