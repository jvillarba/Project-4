var 
    express    = require('express'),
    app        = express(),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    apiRoutes  = require('./routes/api.js')
    
mongoose.connect('mongodb://localhost/mean-review', function(err){
    if(err) return console.log('Error connecting')
    console.log('Connected to MongoDB (mean-review)')
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/api', apiRoutes)

app.listen(3000, function(){
    console.log('Server running on 3000')
})