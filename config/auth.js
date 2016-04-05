var dotenv = require('dotenv').config({silent: true})

module.exports = {
    'facebook': {
        'clientID': process.env.FACEBOOK_CLIENT_ID,
        'clientSecret': process.env.FACEBOOK_CLIENT_SECRET,
        'callbackURL': 'http://localhost:3000/auth/facebook/callback' || 'https://https://vast-tundra-53998.herokuapp.com//auth/facebook/callback',
        'profileFields': ['emails', 'displayName']
    }
}