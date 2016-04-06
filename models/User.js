var
    mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema
    
var userSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    admin: Boolean
})

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User