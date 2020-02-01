var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')
const nodemailer = require("nodemailer");


router.get('/about', function(req, res, next) {
    res.render('about')
 });

 router.get('/example', function(req, res, next) {
    res.render('html')
 });

 router.get('/table2excel', function(req, res, next) {
    res.render('table2excel')
})

router.get('/superplaceholer', function(req, res, next) {
    res.render('superplaceholer')
})


/* GET home page. */
router.get('/', function(req, res, next) {
    // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
    // blog.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     console.log("Save database success")
    //   });
    var perpage = 6;
    var page = req.params.page || 1
    Blog
        .find()
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.count().exec(function(err, count) {
                if(err) return next(err)
                res.render('products',{posts: products, current:page, pages: Math.ceil(count / perpage)})
            })
        })
 
});

router.get('/:page', function(req, res, next) {
    var perpage = 6;
    var page = req.params.page || 1
    Blog
        .find()
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.count().exec(function(err, count) {
                if(err) return next(err)
                res.render('products',{posts: products, current:page, pages: Math.ceil(count / perpage)})
            })
        })
})



module.exports = router;
