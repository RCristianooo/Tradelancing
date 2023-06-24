const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getJob);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/createPro", upload.single("file"), postsController.createPro);

router.put("/bookmarkJob/:id", postsController.bookmarkJob);

router.put("/bookmarkPro/:id", postsController.bookmarkPro);

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/deletePro/:id", postsController.deletePro);

module.exports = router;