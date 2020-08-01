var express = require('express')
var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;

passport.use(
    new Strategy({
        clientID: "2344568432308949",
        clientSecret: "6808f74e9ab61cd50975fa232365fe8c",
        callbackURL: 'http://localhost:3000/login/facebook/return'
    }, 
    function(accessToken, refreshToken, profile, cb){
        return cd(null, profile);
    }
    
    )
);

passport.serializeUser(function(obj, cb){
    cb(null, obj);
});

// creat express app

var app = express();

//set view dir
app.set("views", __dirname +"/views");
app.set("view engine", "ejs");

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'lco app', resave: true, saveUninitialized:true}));


//@route  -  GET  /home
//@desc   -  a route to home page
//@access -  PUBLIC

app.get('/',(req,res)=>{
    res.render("home", { user : req.user});
});

//@route  -  GET  /login
//@desc   -  a route to home page
//@access -  PUBLIC

app.get('login',(req, res)=>{
    res.render("login");
});

//@route  -  GET  /login/facebook
//@desc   -  a/ route to fb page
//@access -  PUBLIC

app.get('/login/facebook',
    passport.authenticate('facebook'));
    
    

//@route  -  GET  /login/facebook
//@desc   -  a/ route to fb page
//@access -  PUBLIC

app.get('/login/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }); 
    

//@route  -  GET  /profile
//@desc   -  a/ route to fb page
//@access -  PRIVATE

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),(req, res)=>{
    res.render('profile',{ user: req.user});
});

app.listen("3000");









