// Express/Logger/Mongoose Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Below is the npm packages we use to scrape the website for articles
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

// Setting up the port
var PORT = 3000;

var app = express();

// Logging requests via Morgan
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Making public folder a static folder
app.use(express.static("public"));

// Connecting to Mongo Data Base
var MONGODB_URI =  "mongodb://localhost/heroku_smtnsm76";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});


// Below are all the routes for the web app

// this is a GET route. It is used to scrape the wikipedia website
app.get("/scrape", function(req,res) {
    // grab the html body
    axios.get("https://en.wikipedia.org/wiki/Main_Page").then(function(response) {
        // this is to load the site into cheerio and save it
        var $ = cheerio.load(response.data);

        $("article h2").each(function(i, element) {
            
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
        
        res.send("Scrape Complete");
    
    });
})

app.listen(PORT, function() {
    console.log("Hello User! This app is running on " + PORT + "!")
});