var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var Categories = require('../model/categories')
var db = require('../model/mongo_connect')
var multer = require('multer')
var upload = multer({
    dest: 'public/images/'
})
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/User')
var bcrypt = require('bcryptjs')

var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dn4nxz7f0',
    api_key: '282914394867582',
    api_secret: 'EouS3IxRufrItXLaY4uIHyHTsK4'
})


/* GET Passport post page. */

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({
                'username': username
            },
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

var isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        findOrCreateUser = function () {
            // find a user in Mongo with provided username
            User.findOne({
                'username': username
            }, function (err, user) {
                // In case of any error return
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message', 'User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }))

var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}



passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

/************************************************************************** */
//get login with post
router.get('/login', function (req, res) {
    // Display the Login page with any flash message, if any
    res.render('login');
});


//Authenticate when login
router.post('/login', passport.authenticate('login'), function (req, res, next) {
    var posts = '';
    Blog.find(function (err, data) {
        if (err) return console.error(err)
        res.render('postadmin', {
            posts: data
        })
    })
});

/************************************************************************** */

router.get('/editpost/:id', function (req, res, ) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        Blog.findOne({
            _id: id
        }, function (err, data) {
            res.render('editpost', {
                post: data
            })
        })
    } else {
        res.render("404page")
    }

})

router.post('/editpost/:id', upload.single('file'), function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var file = req.file;
    var subtitle = req.body.subtitle;
    cloudinary.uploader.upload(file.path, function(err, result) {
        if(err) {console.log(err)}
        console.log(result)
        Blog.findOneAndUpdate({
            _id: req.params.id
        }, {
            title: title,
            content: content,
            subtitle: subtitle,
            file: result.url,
        }, function (err, doc) {
            if (err) throw (err)
            res.redirect('/')
        });
    })



})

router.post('/deletepost/:id', function (req, res) {
    if (req.isAuthenticated()) {
        Blog.deleteOne({
            _id: req.params.id
        }, function (err, done) {
            if (err) console.log(err);
            res.redirect('/')
        })
    } else {
        res.render("404page")
    }
})



router.get('/addpost', function (req, res, next) {
    if (req.isAuthenticated()) {
        Categories.find({}, function(err, data) {
            if (err) return console.error(err)
            res.render('addpost', {
                categories: data
            })
        })
    } else {
        res.render("404page")
    }
});

router.post('/addpost', upload.single('file'), function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var file = req.file;
    var subtitle = req.body.subtitle;
    var categoryID = req.body.category;
    var time = new Date();
    var date = `Ngày ${time.getDate().toString()} Tháng ${(time.getMonth() + 1).toString()}  Năm ${time.getFullYear().toString()}`
    var category;
   
    Categories.findOne({_id: categoryID}, function(err, data){
    if(err) console.log(err)
    category = data.category;
    cloudinary.uploader.upload(file.path, function(err, result) {
        var blog = new Blog({
            title: title,
            content: content,
            subtitle: subtitle,
            file: result.url,
            category: category,
            date: date
        })
        blog.save(function (err, success) {
            if (err) return console.error(error)
            console.log("Save to database success")
        })
        res.redirect('../')
    })
// var blog = new Blog({
//     title: title,
//     content: content,
//     subtitle: subtitle,
//     file: file.filename,
//     category: category,
//     date: date
// })

})
})
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
})

router.get('/addcategories', function(req, res) {
    if (req.isAuthenticated()) {
        // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
        // blog.save(function (err, fluffy) {
        //     if (err) return console.error(err);
        //     console.log("Save database success")
        //   });
        res.render('addcategory')
    } else {
        res.render("404page")
    }
})

router.post('/addcategories', function(req, res) {
    if (req.isAuthenticated()) {
        var category1 = req.body.category;
        console.log(category1)
        var categories = new Categories({
            category: category1
        })
        categories.save(function (err, success) {
            if (err) return console.error(error)
            console.log("Save to database success")
        })
        res.redirect('../')
        // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
        // blog.save(function (err, fluffy) {
        //     if (err) return console.error(err);
        //     console.log("Save database success")
        //   });
    } else {
        res.render("404page")
    }
})
module.exports = router;