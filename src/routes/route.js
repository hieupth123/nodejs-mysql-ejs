import express from 'express'
import homeController from '../controllers/homeController'

const router = express.Router();
const initRoutes = (app) => {
    router.get('/', homeController.getHomPage)
    return app.use('/', router);
}

module.exports = initRoutes