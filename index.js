const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const file = require("express-fileupload");
const bodyparser = require("body-parser");
const path = require("path");
const urlenconded = require("body-parser/lib/types/urlencoded");
const app = express();
app.use(bodyparser.json());
app.use(file());
app.use(express.json());
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs")
const  connection = mongoose.connect("mongodb://localhost/SecondMid");
const database = mongoose.Schema({
    name: {
        type: String,
        // required:true,
    },
    email: {
        type: String,
       // required:true,
    },
    phoneNum:
     {
            type: String,
         //   required: true,    
    },
    email: {
        type: String,
        //required: true, 
    },
    phonenum:{
        type: String,
        //required: true, 
    },
    state: {
        type: String,
        //required: true, 
    },

    address: {
        type: String,
        //required: true,
    },

    country: {
        type: String,
        //required: true, 
    },
    city: {
        type: String,
        //required: true, 
    },
    zipcode: {
        type: String,
     //   required: true, 
    },

    //img: String

});


const users = mongoose.model("User", database, "secondExam");
app.get("/", async (req, res) =>{
  res.render("home");

});

app.get("/view", async (req, res)=>{
    const data = await users.find();
   res.render("view", {data});
 
});


app.post("/save", async (req, res)=>{
    console.log("ite pujyo aahe ");
    const {name, email, number, country, state, city, address,zipcode} = req.body;
    await users.create({name, email, number, country, state, city, address, zipcode});

    res.redirect("view");

});
app.get("/delete/:id", async(req, res)=>{
    console.log("yahan aayaa hai ");
    const {id} = req.params;
    console.log("id to be deleted is this : "+ id);
   const savedData = await model_person.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/view");
});

app.listen(3000, function(){
        console.log("server is listening on port 3000");
})