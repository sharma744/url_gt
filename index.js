let mongoose=require("mongoose")
let express=require("express")
let db2=require("./model/model2.js")

mongoose.connect("mongodb://localhost:27017/hostel");
let db=mongoose.connection;
let app=express();
db.once('open',()=>{
console.log("database connected");
})
db.on('error',()=>{
    console.log("data base coneection error");
})
let fn=async()=>{
    for(let i=0;i<203;i++){
       let room={
        roomno:i+1
       }
       await db2.insertOne(room);

}
}
fn();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("/Users/aayushsharma/hostelprojet/mongoserver/routes/route1")(app);
app.listen(3000,()=>{
    console.log("server connected succesfully");
})