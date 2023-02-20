import express from 'express'
// import homeController from '../controllers/homeController'
// import userController from '../controllers'
import { homeController, userController } from '../controllers'

const router = express.Router();
const initRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/get-create-user', homeController.getCRUD)

    router.post('/create-user', homeController.createUser)
    router.get('/get-users', homeController.getAllUser)
    router.get('/get-edit-user', homeController.getEditUser)
    router.post('/edit-user', homeController.editUser)
    router.get('/delete-user', homeController.deleteUser)

    router.post('/api/login', userController.login)
    return app.use('/', router);
}

module.exports = initRoutes