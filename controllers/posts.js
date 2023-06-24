const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")
const Pro = require("../models/Pro")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMyJobs: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("my-jobs.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getBookmarks: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("bookmarks.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getJobs: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      var users = []
      for(i in posts){
        var user = await User.findById(posts[i].user)
        users.push(user.userName)
      }  
      res.render('jobs.ejs', {posts: posts, userName: users, user: req.user})
    } catch (err) {
      console.log(err);
    }
  },
  getProfessionals: async (req, res) => {
    try {
      const pros = await Pro.find().sort({ createdAt: "desc" }).lean();
      var users = []
      for (i in pros){
        var user = await User.findById(pros[i].user)
        users.push(user.userName)
      }
      res.render('professionals.ejs', {pros: pros, userName: users, user: req.user})
    } catch (err) {
      console.log(err)
    }
  },
  getJob: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("job.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        profession: req.body.profession,
        payment: req.body.payment,
        user: req.user.id,
      });
      console.log("Job has been added!");
      res.redirect("/my-jobs");
    } catch (err) {
      console.log(err);
    }
  },
  createPro: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Pro.create({
        profession: req.body.profession,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        yearsOfExp: req.body.yearsOfExp,
        payment: req.body.payment,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Pro has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  bookmarkJob: async (req, res)=>{
    var bookmarked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      bookmarked = (post.bookmarks.includes(req.user.id))
    } catch(err){
    }
    //if already bookmarked we will remove user from likes array
    if(bookmarked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'bookmarks' : req.user.id}
          })
          
          console.log('Removed user from bookmarks array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to bookmarked array
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'bookmarks' : req.user.id}
            })
            
            console.log('Added user to bookmarks array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  bookmarkPro: async (req, res)=>{
    var bookmarked = false
    try{
      var pro = await Pro.findById({_id:req.params.id})
      bookmarked = (pro.bookmarks.includes(req.user.id))
    } catch(err){
    }
    //if already bookmarked we will remove user from likes array
    if(bookmarked){
      try{
        await Pro.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'bookmarks' : req.user.id}
          })
          
          console.log('Removed user from bookmarks array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to bookmarked array
      else{
        try{
          await Pro.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'bookmarks' : req.user.id}
            })
            
            console.log('Added user to bookmarks array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },
  deletePro: async (req, res) => {
    try {
      // Find post by id
      let pro = await Pro.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(pro.cloudinaryId);
      // Delete post from db
      await Pro.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};