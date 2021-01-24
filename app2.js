//orginal
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");

const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/TimeTableDB", {useNewUrlParser: true});

const subSchema={
  amount: Number,
  desc: String
}
const Sub=mongoose.model("Sub",subSchema);

const mainSchema={
  name:String,
  items: [subSchema]
}
const Main=mongoose.model("Main",mainSchema);

app.get("/",function(req,res){
  Main.find(function(err,foundItem){
  //  console.log(foundItem);
    res.render("list2",{items:foundItem});
  });
});

app.post("/",function(req,res){
  let newUserName=req.body.newUserName;
  let newBtn=req.body.newBtn;
  const main=new Main({
    name:newUserName
  });
  main.save();
  res.redirect("/");
});

app.post("/newValue",function(req,res){
  let amount=req.body.amount;
  let desc=req.body.desc;
  let user=req.body.user;
  if(desc==null)
  {
    desc=""
  }
  let sub=new Sub({
    amount:amount,
    desc:desc
  });
  Main.findOne({name:user},function(err,foundItem){
    console.log(foundItem);
    foundItem.items.push(sub);
    foundItem.save();
    res.redirect("/");
  });


});

app.listen(3000,function(){
  console.log("Server is running on port 3000")
});
