var express = require("express");
var logger = require("morgain");
var mongoose = require("mongoose");

// Below is the npm packages we use to scrape the website for articles
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3100;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//making public folder a static folder
app.use(express.static("public"));

// Connecting to Mongo Data Base
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/heroku_smtnsm76";

mongoose.connect(MONGODB_URI);

// below are all the routes for the web app


// this is a GET route. It is used to scrape the wikipedia website
app.get("/scrape", function(req,res) {
    // grab the html body
    axios.get("https://en.wikipedia.org/wiki/Main_Page").then(function(response) {
        // this is to load the site into cheerio and save it
        var $ = cheerio.load(response.data);

        

    })
})