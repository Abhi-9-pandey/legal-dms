const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
            trim: true
        },

        storedName: {
            type: String,
            required: true
        },

        mimeType: {
            type: String,
            required: true
        },

        size: {
            type: Number,
            required: true
        },

        storagePath: {
            type: String,
            required: true
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Document", documentSchema)