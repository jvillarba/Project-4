var
    User = require('../models/User.js')
    
module.exports = {
    
    // list all users
    index: function(req,res){
        User.find({}, function(err, users){
            if(err) return console.log(err)
            res.json(users)
        })
    }
}