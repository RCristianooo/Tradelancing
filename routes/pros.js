const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const prosController = require("../controllers/pros");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Pro Routes - simplified for now
router.get("/:id", ensureAuth, prosController.getPro);

router.post("/createPro", upload.single("file"), prosController.createPro);

router.put("/bookmarkPro/:id", prosController.bookmarkPro);

router.delete("/deletePro/:id", prosController.deletePro);

module.exports = router;