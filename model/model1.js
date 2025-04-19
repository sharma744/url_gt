let mongoose=require("mongoose");
let db=mongoose.Schema({
    roomno:{
        type:Number,
        required:true,
      
    },
    name:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("student",db);



