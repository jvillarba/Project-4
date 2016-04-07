var
    User = require('../models/User.js')
    jwt = require('jsonwebtoken')

module.exports = {

    // list all users
    index: function(req,res){
        User.find({}, function(err, users){
            if(err) return console.log(err)
            res.json(users)
        })
    },

    // create new user
    create: function(req,res){
        var newUser = new User(req.body)
        newUser.password = newUser.generateHash(req.body.password)
        newUser.save(function(err, user){
            if(err) return console.log(err)
            res.json({success: true, message: "user created", user: user})
        })
    },

    // show specific user
    show: function(req,res){
        User.findOne({_id: req.params.id}, 'email name', function(err, user){
            if(err) return console.log(err)
            res.json(user)
        })
    },

    // update a user
    update: function(req,res){
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user){
            if(err) return console.log(err)
            res.json({success: true, message: "user updated", user: user})
        })
    },

    // delete a user
    delete: function(req,res){
        User.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) return console.log(err)
            res.json({success: true, message: "user deleted"})
        })
    },

    // authenticate user
	authenticate: function(req,res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err) return console.log(err)
			if(!user) return res.json({success: false, message: "No User Found."})
			if(user && !user.validPassword(req.body.password)) {
				return res.json({success: false, message: "Wrong password!"})
			}
			var token = jwt.sign(user.toObject(), process.env.secret, {
				expiresIn: 6000
			})
			res.json({success: true, message: "Boom! Token!", token: token})
		})
	},

	protect: function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token']

		if(token){
			jwt.verify(token, process.env.secret, function(err, decoded){
				if(err) return res.json({success: false, message: "Failed to verify token."})
				req.decoded = decoded
				console.log(decoded)
				next()
			})
		} else{
			return res.status(403).json({
				success: false,
				message: "No token provided."
			})
		}
	}
}
