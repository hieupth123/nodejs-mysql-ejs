import express from 'express'
import homeController from '../controllers/homeController'

const router = express.Router();
const initRoutes = (app) => {
    router.get('/', homeController.getHomPage)
    return app.use('/v1/api', router);
}

module.exports = initRoutes