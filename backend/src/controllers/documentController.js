const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No document uploaded"
            });
        }

        const document = await Document.create({

            originalName: req.file.originalname,

            storedName: req.file.filename,

            mimeType: req.file.mimetype,

            size: req.file.size,

            storagePath: req.file.path,

            uploadedBy: req.user.userId,

            organization: req.user.organizationId

        });

        res.status(201).json({
            message: "Document uploaded successfully",

            document
        });

    } catch (error) {

        console.error(
            "Document upload error:",
            error
        );

        res.status(500).json({
            message: "Server error during document upload"
        });
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            organization: req.user.organizationId
        })
            .populate("uploadedBy", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            documents
        });
    } catch (error) {
        console.error(
            "Get documents error:",
            error
        );

        res.status(500).json({
            message: "Server error while fetching documents"
        });
    }
};

module.exports = {
    uploadDocument,
    getDocuments
};
