var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../model/blog')
var db = require('../model/mongo_connect')
var multer = require('multer')
var upload = multer({
    dest: 'public/images/'
})
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/User')
var bcrypt = require('bcryptjs')

/* GET home page. */

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
router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('login');
  });


router.post('/', passport.authenticate('login', {
    failureRedirect: '/',
    failureFlash : true 
  }), function(req, res, next) {
    res.send("Login Success")
  });

  /************************************************************************** */






router.get('/addpost', function (req, res, next) {
    if(req.isAuthenticated()){
    // var blog = new Blog({title:'Article1', content:'lorem With supporting text below as a natural lead-in to additional content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt culpa nisi porro dignissimos ab a debitis officiis consequatur. Animi, corrupti aliquid. Labore nisi impedit aperiam atque voluptatem dolore sed deleniti.'})
    // blog.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     console.log("Save database success")
    //   });
    res.render('postadmin')
    } else{
        res.render("404page")
    }
});

router.post('/addpost', upload.single('file'), function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var file = req.file;
    var subtitle = req.body.subtitle;
    console.log(file)
    var blog = new Blog({
        title: title,
        content: content,
        subtitle: subtitle,
        file: file.filename,
    })
    blog.save(function (err, success) {
        if (err) return console.error(error)
        console.log("Save to database success")
    })
    res.redirect('../')
})

module.exports = router;