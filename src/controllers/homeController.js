import db from "../models"
import userService from '../services/userService'
const getHomPage = async (req, res) => {
    try {
        const users = await db.User.findAll()
        return res.render('homepage.ejs', { users: JSON.stringify(users) })
    } catch (error) {
        console.log(error)
    }
}

const getCRUD = async (req, res) => {
    // return res.send("Hello from controller")
    // const users = await db.User.findAll()
    return res.render('crud.ejs')
}

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body)
    return res.redirect('/get-users')
}

const getAllUser = async (req, res) => {
    const users = await userService.getAllUser()
    return res.render('users.ejs', { users })
}


const getEditUser = async (req, res) => {
    if (req.query.id) {
        const user = await userService.getUser(req.query.id)
        if (!user) {
            return res.send('Can not found this user')
        }
        return res.render('edit-user.ejs', { user })
    } else {
        return res.send('Can not found this user')
    }

    // const users = await userService.getAllUser()
    // return res.render('users.ejs', { users })
}

const editUser = async (req, res) => {
    if (req.body.id) {
        const user = await userService.updateUser(req.body)
        return res.redirect('/get-users')
    } else {
        return res.send('Can not update this user')
    }

    // const users = await userService.getAllUser()
    // return res.render('users.ejs', { users })
}

const deleteUser = async (req, res) => {
    if (req.query.id) {
        const user = await userService.deleteUser(req.query.id)
        return res.redirect('/get-users')
    } else {
        return res.send('Can not found this user')
    }

    // const users = await userService.getAllUser()
    // return res.render('users.ejs', { users })
}

module.exports = {
    getHomPage: getHomPage,
    getCRUD: getCRUD,
    createUser: createUser,
    getAllUser: getAllUser,
    getEditUser: getEditUser,
    editUser,
    deleteUser
}