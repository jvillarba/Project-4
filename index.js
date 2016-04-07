var 
    express    = require('express'),
    app        = express(),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    apiRoutes  = require('./routes/api.js'),
    dotenv     = require('dotenv').load({silent: true}),
    jwt        = require('jsonwebtoken'), // used to create, sign, and verify tokens
    User       = require('./models/User'), // get mongoose model
    urljoin    = require('url-join'),
    assign     = require('object-assign'),
    request    = require('xhr-request'),
    md5        = request('md5')

var version = 'v1'
var endpoint = 'https://gateway/marvel.com'
module.exports = marvelApi
function marvelApi (api, opt, cb){
    opt = assign({ json: true}, opt)
    
    if (typeof api !== 'string'){
        throw new TypeError('marvel-comics-api must specify an API to request')
    }

    var privateKey = opt.privateKey
    var publicKey = opt.publicKey
    if( typeof publicKey !== 'string'){
        throw new TypeError('marvel-comic-api must specify a publicKey')
    }
    
    var auth = {
        apikey: publicKey
    }
    
    // private key is optional in the browser
    if (typeof privateKey === 'string')
        auth.ts = String(Date.now())
        auth.hash = md5(auth.ts + privateKey + publicKey)
        
    opt.query = assign({}, opt.query, auth)
    
    // strip start and end slash to avoid Marvel 404ing
    api = api.replace(/^\/|\/$/g, '')
    var url = urljoin(endpoint, version, 'publicKey', api)
    return request(url, opt, cb)
}

// environment port
var port = process.env.PORT || 8080 

// connect to MLAB (mongodB)
var DB_URL = process.env.MLAB_LINK || 'mongodb://localhost/marvel-app'

// mongoose.connect(config.database) // connect to dB
mongoose.connect(DB_URL, function(err){
    if(err) return console.log('Error connecting')
    console.log('Connected to ' + DB_URL)
}) // connect to dB
app.set('superSecret', process.env.secret) // secret variable

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