var
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
