var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("article")
});

router.get('/about', function(req, res, next) {
   res.render('about')
});

router.get("/css", function(req, res) {
  Blog.find({category:"CSS"}, function(err, data){
    res.render("category", {data: data})
  })
})
router.get("/html", function(req, res) {
  Blog.find({category:"HTML"}, function(err, data){
    res.render("category", {data: data})
  })
})

router.get("/nodejs", function(req, res) {
  Blog.find({category:"NodeJs"}, function(err, data){
    res.render("category", {data: data})
  })
})

router.get("/:id", function(req, res) {
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err, data) {
        res.render("article", {article: data})
    })
})




module.exports = router;
