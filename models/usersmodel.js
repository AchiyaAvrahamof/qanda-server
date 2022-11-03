const mongoose = require('mongoose');
// import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
       required: true
    }
})


const User=mongoose.model('User',UserSchema)
module.exports=User
// export default User;
