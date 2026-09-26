const express = require("express");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadDocument,
    getDocuments
} = require("../controllers/documentController");

const router = express.Router();

router.get(
    "/",
    protect,
    getDocuments
);

router.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadDocument
);

module.exports = router;