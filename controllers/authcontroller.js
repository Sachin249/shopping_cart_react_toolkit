var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
var users = require('../models/user')
var verifyToken = require('../middleware/verifytokenuser');

router.post('/userlogin', 
body('name').not().isEmpty().withMessage('name Required'), 
body('email').not().isEmpty().withMessage('email Required'), 
async function(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  try{
    const user = await users.findOne({email:req.body.email})
    if(!user){

      const createUser = new users({
        'name':req.body.name,
        'email':req.body.email,
      })

      const saveUser = await createUser.save() 
 
      let token = jwt.sign({ id: saveUser._id,name: saveUser.name}, global.config.usersecretKey, {
        algorithm: global.config.algorithm,
        expiresIn: '7d'
      });
      const updateData= await users.findOneAndUpdate({'_id':saveUser._id}, {'remember_token':token,});
        
      return res.status(201).json({
        message: `Hi ${saveUser.name} , welcome to my project`,
        jwttoken: token,
        data:saveUser
      });

    }

    let token = jwt.sign({ id: user._id,name: user.name}, global.config.usersecretKey, {
      algorithm: global.config.algorithm,
      expiresIn: '7d'
  });
  const updateData= await users.findOneAndUpdate({'_id':user._id}, {'remember_token':token,});
  res.status(200).json({
    message: `Hi ${user.name}, welcome back to my project`,
    jwtoken: token,
    data:user
  });
  }
  catch(err){
    console.log(err)
    res.status(500).json({
      message: 'Something went wrong , please try again later'
    });
  }
  
});

module.exports = router;