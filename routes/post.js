var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')

/* GET home page. */
router.get('/', function(req, res, next) {
    var posts = '';
    Blog.find(function(err, data){
        if (err) return console.error(err)
        res.render('index', {posts:data})
    })
 
});

module.exports = router;