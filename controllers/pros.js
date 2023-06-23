const cloudinary = require("../middleware/cloudinary");
const Pro = require("../models/Pro");
const User = require("../models/User");

module.exports = {
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
    getPro: async (req, res) => {
        try {
          const pro = await Pro.findById(req.params.id);
          res.render("professional.ejs", { pro: pro, user: req.user });
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
        // Find pro by id
        let pro = await Pro.findById({ _id: req.params.id });
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(pro.cloudinaryId);
        // Delete pro from db
        await Pro.remove({ _id: req.params.id });
        console.log("Deleted Pro");
        res.redirect("/profile");
      } catch (err) {
        res.redirect("/profile");
      }
    },
  };