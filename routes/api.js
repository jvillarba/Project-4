var
    express   = require('express'),
    apiRouter = express.Router(),
    apiCtrl   = require('../controllers/api.js')
    
apiRouter.route('/users')
    .get(apiCtrl.index)
    
    
module.exports = apiRouter