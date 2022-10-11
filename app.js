const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// connect mongodb
mongoose.connect("mongodb://localhost:27017/WikiDB", {useNewUrlParser:true});
const articleSchema = new mongoose.Schema({
    title : String,
    content : String
});
const Article = mongoose.model("Article", articleSchema);

// GET all Article -- using get request we send all articles content in web
app.get("/articles",(req,res) =>{

Article.find((err, foundArticles) =>{
    if(!err){

        res.send(foundArticles);
    }
    else{
        res.send(err);
    }
});
});

// post request - Use to create one new article
app.post('/articles', (req,res) =>{

// console.log(req.body.title); 
// console.log(req.body.content); 

//create
const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
});
newArticle.save((err) =>{
    if(!err){
        res.send("Succesfully added a new article");
    }else{
        res.send(err);
    }
});

});

//DELETE all the articles
app.delete('/articles', (req,res)=>{
    
    //delete mongoose
    Article.deleteMany((err) =>{
        if(!err){
            res.send("Successfully created all the article");
        }else {
            res.send(err);
        }
    });
});


app.listen(3000, console.log("The server is  running at port 3000"));
