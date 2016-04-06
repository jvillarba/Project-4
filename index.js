var 
    express    = require('express'),
    app        = express(),
    logger     = require('morgan'),
    // materialize = require('materialize-css'),
    mongoose   = require('mongoose'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    apiRoutes  = require('./routes/api.js'),
    jwt        = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config     = require('./config'), // get config file
    User       = require('./models/User') // get mongoose model

// environment port
var port = process.env.PORT || 8080 

// connect to MLAB (mongodB)
var DB_URL = process.env.MLAB_LINK || 'mongodb://localhost/marvel-app'

// mongoose.connect(config.database) // connect to dB
mongoose.connect(DB_URL, function(err){
    if(err) return console.log('Error connecting')
    console.log('Connected to ' + DB_URL)
}) // connect to dB
app.set('superSecret', config.secret) // secret variable

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// apply routes to application with the prefix /api
app.use('/api', apiRoutes)

app.listen(port, function(){
    console.log('Server running at http://localhost:' + port)
})