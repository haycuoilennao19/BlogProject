var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')


/* GET home page. */
router.get('/', function(req, res, next) {
    // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
    // blog.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     console.log("Save database success")
    //   });
    var posts = '';
    Blog.find(function(err, data){
        if (err) return console.error(err)
        res.render('index', {posts:data})
    })
 
});



module.exports = router;
