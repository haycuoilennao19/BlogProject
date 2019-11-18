var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')
var multer = require('multer')
var upload = multer({dest: 'public/images/'})

/* GET home page. */

router.get('/addpost', function(req, res, next) {
    // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
    // blog.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     console.log("Save database success")
    //   });
    res.render('addpost')
  });

router.post('/addpost',upload.single('file'), function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var file = req.file;
    var subTitle = req.subTitle;
    console.log(file)
    var blog = new Blog({
        title: title,
        content: content,
        file:file.filename,
        subTitle: subTitle
    })
    blog.save(function(err, success){
        if(err) return console.error(error)
        console.log("Save to database success")
    })
    res.redirect('../')
})

module.exports = router;