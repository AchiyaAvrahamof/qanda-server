const mongoose= require("mongoose")

const AuctionSchema=mongoose.Schema({
   image:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   startBit:{
    type:String,
    required:true
   },
   courentBit:{
    type:String,
    required:true
   },
   datestart:{
    type:String,
    required:true
   },
   howMachTime:{
    type:String,
    required:true
   },
   Bited:{
    type:Array,
    required:true
   },
 
   ownerUserEmail:{
    type:String,
    require:true
     },
   Type:{
    type:String,
    require:true
     },
   productName:{
    type:String,
    require:true
     }

})
const Auction=mongoose.model('auction',AuctionSchema)
module.exports=Auction