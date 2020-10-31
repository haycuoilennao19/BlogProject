var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect');



router.get('/0', function(req, res, next) {
    res.render('404page')
  })

 
    
router.get('/sitemap.xml', function(req, res, next) {
    res.sendFile('/sitemap.xml');
 });

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



router.get('/', function(req, res, next) { 
    var perpage = 6;
    var page = req.params.page || 1
    Blog
        .find()
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments().exec(function(err, count) {
                if(err) return next(err)
                products.forEach(function (product) { 
                    if(product.file.includes(".jpg")){
                        product.file =  product.file.replace(".jpg", ".webp");
                    } else if( product.file.includes(".png")){
                        product.file =  product.file.replace(".png", ".webp");
                    }
                    var arr = ((product.file).split("/"));
                    product.file = arr[arr.length-1]
                  

                    
                   
                    var subtitle = (product.subtitle).replace(/^(.{130}[^\s]*).*/, "$1");
                    product.subtitle = (subtitle + '...');
                }); 

        
               
                res.render('products',{posts: products, current:page, pages: Math.ceil(count / perpage)})
            })
        })
 
});

router.get('/:page', function(req, res, next) {
    if(isNaN(req.params.page)){
        res.status(404)
        if (req.accepts('html')) {
            res.render('404page', { url: req.url });
            return;
          }
    }
  
    var perpage = 6;
    var page = req.params.page || 1
    Blog
        .find({})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments().exec(function(err, count) {
               
                if(err) return next(err)
                products.forEach(function (product) { 
                    if(product.file.includes(".jpg")){
                        product.file =  product.file.replace(".jpg", ".webp");
                    } else if( product.file.includes(".png")){
                        product.file =  product.file.replace(".png", ".webp");
                    }
                    var arr = ((product.file).split("/"));
                    product.file = arr[arr.length-1]
                    var subtitle = (product.subtitle).replace(/^(.{130}[^\s]*).*/, "$1");
                    product.subtitle = (subtitle + '...');
                }); 
                res.render('products',{posts: products, current:parseInt(page), pages: Math.ceil(count / perpage)})
            })
        })
})



module.exports = router;
