const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var multer = require('multer');
const path=require('path');
const User = require('../models/user');
var cloudinary = require('cloudinary');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('photo');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


router.post('/image', (req, res, next) => {
  
var path = '';
upload(req, res, function (err) {
if (err) {
res.json({success: false, msg:'Only Images'})
}  
else{
  
cloudinary.config({ 
cloud_name: 'thanksmummy', 
api_key: '581531288449676', 
api_secret: '2nk_1mCiRAxI3PAXYQqtbjJr3Gw' 
})
cloudinary.uploader.upload(req.file.path, function(result) { 
res.json({success: true, msg:result.secure_url})
})      
}
});	 
})

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstname: req.body.firstname,
    surname: req.body.lastname,
    lastname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    dob: req.body.dob,
    imageUrl: req.body.imageUrl,
    password: req.body.password,
    contact: req.body.contact
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;