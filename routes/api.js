var
    express   = require('express'),
    apiRouter = express.Router(),
    apiCtrl   = require('../controllers/api.js')
    
apiRouter.route('/users')
    .get(apiCtrl.index)
    .post(apiCtrl.create)
    
apiRouter.route('/users/:id')
    .get(apiCtrl.show)
    .patch(apiCtrl.update)
    .delete(apiCtrl.delete)
    
apiRouter.post('/authenticate', function(req,res){
    console.log(req.body)
    // find user
    User.findOne({name: req.body.name}, function(err, user){
        if(err) throw err
        // user not found msg
        if(!user){
            res.json({ success: false, message: 'Authentication failed. User not found.' })
        } else if (user) {
            // password does not match
            if (user.password != req.body.password){
                res.json({ success: false, message: 'Authentication failed. Wrong password.' })
            } else {
                // we found the user and the password matches
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 6000 // ? how many 
                })
                
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                })
            }
        } 
    })
})

// route middleware to verify token
apiRouter.use(function(req,res, next){
    // check header or url paramters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    
    // decode token
    if (!token) {
        res.json({ 
            success: false,
            message: 'you need a token to play at ChuckeCheese'})
    } else {
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if(err){
                return res.json({ 
                    success: false, 
                    message: 'That token is not legit'
                })
            } else {
                // everthing is good with the token, then save it to the req in other routes
                req.decoded = decoded
                next()
            }
        })
    }
})

module.exports = apiRouter