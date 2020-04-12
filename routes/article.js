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
router.get('/Hoc-Bootstrap4', function(req, res, next) {
    res.render("bootstrap4");
  })

router.get("/css", function(req, res) {
  Blog
      .find({category:"CSS"})
      .sort({_id: -1})
      .exec(function(err, data) {
          Blog.countDocuments().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data})
          })
      })
  // Blog.find({category:"CSS"}, function(err, data){
  //   res.render("category", {data: data})
  // })
})
router.get("/html", function(req, res) {
  Blog
      .find({category:"HTML"})
      .sort({_id: -1})
      .exec(function(err, data) {
          Blog.countDocuments().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data})
          })
      })
  // Blog.find({category:"HTML"}, function(err, data){
  //   res.render("category", {data: data})
  // })
})

router.get("/Javscript", function(req, res) {

  Blog
      .find({category:"Javscript"})
      .sort({_id: -1})
      .exec(function(err, data) {
          Blog.countDocuments().exec(function(err, count) {
              if(err) return next(err)
              res.render('category',{data: data})
          })
      })
})

router.get("/:id", function(req, res) {
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err, data) {
        if(data){
            res.render("article", {article: data})
        }
        else{
            res.render('404page')
        }
    })
})




module.exports = router;
