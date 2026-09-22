const mongoose = require("mongoose");
const Organization = require("./Organization");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["ADMIN", "INVESTIGATION", "CLERK", "AUDITOR"],
            default: "CLERK"
        },

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);