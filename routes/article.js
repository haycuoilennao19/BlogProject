var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')
var slug = require('slug')
var Categories = require('../model/categories')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("article")
});
// router.get('/Hoc-Javascript', function(req, res, next) {
//     res.render('HocJavascript')
//   });
router.get('/about', function(req, res, next) {
   res.render('about')
});
  router.get('/css/0', function(req, res, next) {
    res.render('404page')
  })

  router.get('/html/0', function(req, res, next) {
    res.render('404page')
  })
  router.get('/Resource/0', function(req, res, next) {
    res.render('404page')
  })

  router.get('/Javascript/0', function(req, res, next) {
    res.render('404page')
  })


router.get("/css", function(req, res) {
    var perpage = 6;
    var page = req.params.page || 1
    var category = "css"
    
    Blog
        .find({category:"CSS"})
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
                res.render('products-category',{posts: products, current:page, pages: Math.ceil(count / perpage), category: category})
            })
        })
})


router.get('/css/:page', function(req, res, next) {
    var perpage = 6;
    var page = req.params.page || 1;
    var category = "css"
    Blog
        .find({category:"CSS"})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments({category:"CSS"}).exec(function(err, count) {
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
                res.render('products-category',{posts: products, current:parseInt(page), pages: Math.ceil(count / perpage), category: category})
            })
        })
})

router.get("/html", function(req, res) {
    var perpage = 6;
    var page = req.params.page || 1
    var category = "html"
    Blog
        .find({category:"HTML"})
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
                res.render('products-category',{posts: products, current:page, pages: Math.ceil(count / perpage), category: category})
            })
        })
})



router.get('/html/:page', function(req, res, next) {
    var perpage = 6;
    var page = req.params.page || 1;
    var category = "html"
    Blog
        .find({category:"HTML"})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments({category:"HTML"}).exec(function(err, count) {
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
                res.render('products-category',{posts: products, current:parseInt(page), pages: Math.ceil(count / perpage), category: category})
            })
        })
})
router.get("/Javascript", function(req, res) {

    var perpage = 6;
    var page = req.params.page || 1
    var category = "Javascript"
    Blog
        .find({category:"Javascript"})
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
                res.render('products-category',{posts: products, current:page, pages: Math.ceil(count / perpage), category: category})
            })
        })
})




router.get('/Javascript/:page', function(req, res, next) {
    var perpage = 6;
    var page = req.params.page || 1;
    var category = "Javascript"
    Blog
        .find({category:"Javascript"})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments({category:"Javascript"}).exec(function(err, count) {
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
                res.render('products-category',{posts: products, current:parseInt(page), pages: Math.ceil(count / perpage), category: category})
            })
        })
})

router.get("/Resource", function(req, res) {

    var perpage = 6;
    var page = req.params.page || 1
    var category = "Resource"
    Blog
        .find({category:"Resource"})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments({category:"Resource"}).exec(function(err, count) {
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
                res.render('products-category',{posts: products, current:page, pages: Math.ceil(count / perpage), category: category})
            })
        })
})


router.get('/Resource/:page', function(req, res, next) {
    var perpage = 6;
    var page = req.params.page || 1
    var category = "Resource"
    Blog
        .find({category:"Resource"})
        .sort({_id: -1})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(function(err, products) {
            Blog.countDocuments({category:"Resource"}).exec(function(err, count) {
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
                res.render('products-category',{posts: products, current:page, pages: Math.ceil(count / perpage), category: category})
            })
        })
})


// router.get("/Bootstrap", function(req, res) {

//     Blog
//         .find({title: {$regex : /Bootstrap/}})
//         .sort({_id: 1})
//         .exec(function(err, data) {
//             Blog.countDocuments().exec(function(err, count) {
//                 if(err) return next(err)
//                 data.forEach(function (item) { 
//                     if(item.file.includes(".jpg")){
//                         item.file =  item.file.replace(".jpg", ".webp");
//                     } else if( item.file.includes(".png")){
//                         item.file =  item.file.replace(".png", ".webp");
//                     }
//                 }); 
//                 res.render('category',{data: data})
//             })
//         })
//   })


//   router.get("/updateall", function(req, res) {

//     Blog.find({}, function(err, data) {
//         if (err) return done(err);
//        for(i=0; i< data.length;i++){
//           var slugTitle = slug(data[i].title)
//           data[i].slug = slugTitle;
//           data[i].save()
//        }
        
//     })
// })

router.get("/:slug", function(req, res) {
    var slug = req.params.slug;
    Blog.findOne({slug: slug}, function(err, data) {
        if(data){
    
            let dateCreate = (data.date.split(" "));
            let dateModified = dateCreate[6] + "-" + dateCreate[3] + "-" + dateCreate[1];
            
                if(data.file.includes(".jpg")){
                    data.file =  data.file.replace(".jpg", ".webp");
                } else if( data.file.includes(".png")){
                    data.file =  data.file.replace(".png", ".webp");
                }
              
                data.file_image_facebook = data.file;
                console.log(data.file_image_facebook)
                var arr = ((data.file).split("/"));
                data.file = arr[arr.length-1]
            res.render("article", {article: data, dateModified: dateModified})
        }
        else{
            res.render('404page')
        }
    })
})

// router.get("/:id", function(req, res) {
//     var id = req.params.id;
//     Blog.findOne({_id: id}, function(err, data) {
//         if(data){
//             res.render("article", {article: data})
//         }
//         else{
//             res.render('404page')
//         }
//     })
// })


  




module.exports = router;
