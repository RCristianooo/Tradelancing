const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const prosController = require("../controllers/pros");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/jobs", ensureAuth, postsController.getJobs);
router.get("/professionals", ensureAuth, prosController.getProfessionals)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.get("/my-jobs", ensureAuth, postsController.getMyJobs);
router.get("/bookmarks", ensureAuth, postsController.getBookmarks);
router.post("/signup", authController.postSignup);

module.exports = router;