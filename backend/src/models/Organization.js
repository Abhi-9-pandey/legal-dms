const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        organizationType: {
            type: String,
            enum: ["POLICE", "LAW_FIRM", "COURT", "INVESTIGATION_AGENCY"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Organization", organizationSchema);