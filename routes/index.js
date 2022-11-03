var express = require('express');
const User = require('../models/usersmodel');
var router = express.Router();
const bcrypt = require('bcrypt');
var express = require("express");
const Auction=require('../models/productmodels')
const nodemailer= require("nodemailer")

/* GET home page. */
router.get('/register', function(req, res, next) {
  console.log("jnjnj");
  res.json('index');
});


router.post('/register', async function(req, res, next) {
   console.log(req.body);
    const {first_name,last_name, email} = req.body
    let {password} = req.body
    const userExists = await User.findOne({email});
    
    console.log(first_name+" "+last_name);
    if(!userExists){
      password = await bcrypt.hash(password, 10)
      const user = {
        first_name,
        last_name,
        email, 
        password
      }
      console.log(email+" nbc" +password);
      User.create(user).then(() =>{ 
          res.json({
            "error" : false,
            "message": "user registered successfully"
          })
        }).catch(err =>{
          res.json({
            "error" : true,
            "message": "couldn't register user",
            "m":err

          })
        })

    }else{
      res.json({
        "error" : true,
        "message": "user already registered"
      })
    }
    

});

router.post('/login', async function(req, res, next) {
  console.log(req.body);
  const {email, password} = req.body

  const user = await User.findOne({email})
  
  if(user){
    const result = await bcrypt.compare(password, user.password)
    console.log(result );
    if(result){
      res.json({
        "error" : false,
        "message": "login successfully",
        "first_name":user.first_name,
        "last_name":user.last_name,
        "email":email
      })
    }else{
      
      res.json({
        "error" : true,
        "message": "email or password is wrong"
      })
    }
  }
  

});

router.get('/auction',(req,res,next)=>{
  Auction.find({},['image','description','startBit','courentBit','datestart','howMachTime','Bited','ownerUserEmail','Type','productName'])
  .then((data) => res.json(data))
  .catch(next)
})
  

router.post('/auction',(req,res,next)=>{
  // req.body.name && req.body.size && req.body.color && req.body.vailent && req.body.problem && req.body.time && req.body.photo && req.body.type && req.body.exstraDetails && req.body.phoneNumber && req.body.email && req.body.name?
 console.log(req.body);
  {Auction.create(req.body)
  .catch(next)
  console.log("posted")
  res.json({error:'dont have all the elements'})
}
})

router.delete('/auction/:id', ( req,res,next) => {
  console.log("delete");
  Auction.findOneAndDelete({_id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
})

router.patch('/auction/:id', ( req,res,next) => {
  console.log("update the bit");
  const id = req.params.id
  const email = req.body.email
  const bit = req.body.bit
  const newBit={[`${email}`]:bit};
  auction= Auction.findOne({_id:id })
  .then((data) =>{
    lengthOBited=data?.Bited.length-1
    const LastBid = Object.values(data?.Bited[lengthOBited])[0];

    console.log(bit);
    if (bit>LastBid) {
      Auction.findOneAndUpdate({_id:id }, {Bited:[...data.Bited,newBit]},{ returnDocument: 'after' },function(err, doc){
        res.json(data)
        if(err){
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        })
      }
      else{
        console.log("the bit is low!");
        next()
      }
  }
  )
  .catch(next)
}
)
module.exports = router;

router.post('/sendEmail',(req,res,next)=>{
  

     let transporter=nodemailer.createTransport({
      service: "gmail",
      auth:{
        user:"",
        pass:""
      },
      tls:{
        rejectUnauthorized:false
      }

     })

     let mailOption={
      from:"",
      to:"",
      subject:"",
      text:""
     }
    transporter.sendMail(mailOption, function (err,success) {
      if(err){
        console.log(err)
      }else{
        console.log("email send successfully!");
      }
      
    })
})
