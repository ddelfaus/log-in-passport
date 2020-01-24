const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./auth-model')
const bcrypt = require("bcryptjs")
const db = require('../database/dbConfig.js');
router.use(passport.initialize())




// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(password)
//     Users.findBy({username}, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user && bcrypt.compareSync(password, user.password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);

//     });
//   }
// ));



passport.use(
  new LocalStrategy( (username, password, done) => {
    {
      db("users")
        .where({ username })
        .first()
        .then(user => {
          if (!user) return done(null, false);
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  })
)



      router.post('/register', (req, res) => {

        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;
        Users.add(user)
            .then(saved => {
                res.status(201).json({saved, message: "account created"})
                
            })
            .catch(error => {
              res.status(500).json({ message: "failed creating account. Make sure to have all the required fields and that the username and email is unique "})
            })
    
    })
    
    


    router.get('/',
      function(req, res) {
        res.status(201).json({message: "ello"})
      });
    
    router.get('/login',
      function(req, res){
        res.status(201).json({message: "please log in"})
      });
      
    router.post('/login', 
    
      passport.authenticate('local', { session: false}),
      function(req, res) {
        
        res.status(201).json({message: "You are in"});
      });



      router.post('/login2', (req, res) => {

        let { username, password } = req.body;
        Users.findBy({ username })
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
            
              res.json({message: "you are in!"})
            
            } else {
              res.status(401).json({ message: "Invalid Credentials" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "failed finding account with that username "})
          });
      
      });
      

      
    router.get('/logout',
      function(req, res){
        req.logout();
        res.redirect('/');
      });
    
    router.get('/profile',
      require('connect-ensure-login').ensureLoggedIn(),
      function(req, res){
        res.render('profile', { user: req.user });
      });
// // auth login
// router.get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });

// // auth logout
// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

// // auth with google+
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// // callback route for google to redirect to
// // hand control to passport to use code to grab profile info
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     // res.send(req.user);
//     res.redirect('/profile');
// });

module.exports = router;