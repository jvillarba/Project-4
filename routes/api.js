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
    
module.exports = apiRouter