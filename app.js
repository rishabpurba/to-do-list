
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://0.0.0.0:27017/todolistDB');
const listSchema = new mongoose.Schema({
  name : String
})
const List = new mongoose.model('List',listSchema)


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const item1 = new List({
  name:'rishab'
})
const item2 = new List({
  name:'piyush'
})
const item3 = new List({
  name:'amith'
})

const items = [item1,item2,item3];
const workItems = [];

app.get("/", function(req, res) {
 /*List.find({},function(err,foundItems){
  if(err){
    console.log(err)
  }
  else{

    res.render("List", {listTitle: "Today", newListItems: foundItems});

  }

})*/
List.find({}).then(foundItems => {
  res.render("List", {listTitle: "Today", newListItems: foundItems});

})



});

app.post("/", function(req, res){

  const item = req.body.newItem;
  console.log(item)
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    const insert = new List({      name:item
    })

    insert.save()
    res.redirect('/')
  }
});

app.post("/delete",function (req, res){
  const itemid= req.body.checkbox


List.findByIdAndRemove({_id:itemid}).then(err=>{

    console.log('successfully deleted')
})
  res.redirect('/')
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
