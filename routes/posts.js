const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getJob);

router.post("/createPost", upload.single("file"), postsController.createJob);

router.put("/bookmarkJob/:id", postsController.bookmarkJob);

router.delete("/deletePost/:id", postsController.deleteJob);

module.exports = router;