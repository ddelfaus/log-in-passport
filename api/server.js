const express =require('express')
// const cors = require('cors');
// const helmet = require('helmet');
const passport = require('passport');

const authRoutes = require('../routes/auth-routes')

const server = express();



// server.use(require('morgan')('combined'))
// server.use(require('body-parser').urlencoded({ extended: true}))
server.use(express.json());
// server.use(express.urlencoded({ extended: true}))
// server.use(require('express-session')({secret: 'test', resave: false, saveUninitialized: false}))


server.use(passport.initialize())


server.use('/api/auth', authRoutes)






server.get('/', (req, res) => {
    res.status(200).json({ server: "server is up"})
})


module.exports = server;