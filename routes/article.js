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
  var perpage = 6;
  var page = req.params.page || 1
  Blog
      .find({category:"CSS"})
      .sort({_id: -1})
      .skip((perpage * page) - perpage)
      .limit(perpage)
      .exec(function(err, data) {
          Blog.count().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data, current:page, pages: Math.ceil(count / perpage)})
          })
      })
  // Blog.find({category:"CSS"}, function(err, data){
  //   res.render("category", {data: data})
  // })
})
router.get("/html", function(req, res) {
  var perpage = 6;
  var page = req.params.page || 1
  Blog
      .find({category:"HTML"})
      .sort({_id: -1})
      .skip((perpage * page) - perpage)
      .limit(perpage)
      .exec(function(err, data) {
          Blog.count().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data, current:page, pages: Math.ceil(count / perpage)})
          })
      })
  // Blog.find({category:"HTML"}, function(err, data){
  //   res.render("category", {data: data})
  // })
})

router.get("/Javscript", function(req, res) {
  var perpage = 6;
  var page = req.params.page || 1
  Blog
      .find({category:"Javscript"})
      .sort({_id: -1})
      .skip((perpage * page) - perpage)
      .limit(perpage)
      .exec(function(err, data) {
          Blog.count().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data, current:page, pages: Math.ceil(count / perpage)})
          })
      })
  // Blog.find({category:"ThuthuatCSS"}, function(err, data){
  //   res.render("category", {data: data})
  // })
})

router.get("/:id", function(req, res) {
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err, data) {
        res.render("article", {article: data})
    })
})




module.exports = router;
