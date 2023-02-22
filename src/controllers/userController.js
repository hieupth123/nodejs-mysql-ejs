import userService from '../services/userService'

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing inputs parameter!'
        })
    }

    const userData = await userService.userLogin(email, password)
    return res.status(200).json({
        code: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
const getUsers = async (req, res) => {
    const users = await userService.getAllUser()
    return res.status(200).json({
        code: 0,
        message: 'Ok',
        users: users && users.length > 0 ? users : []
    })
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUser(id);
    return res.status(200).json({
        code: 0,
        message: 'Ok',
        user: user ? user : {}
    })
}

const createUser = async (req, res) => {
    const data = await userService.createUser(req.body)
    return res.status(200).json({
        code: data.errCode,
        message: data.errMessage,
        user: data.user ? data.user : {}
    })
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(200).json({
                code: 1,
                message: 'Missing request parameters!',
                user: data.user ? data.user : {}
            })
        }
        const data = await userService.deleteUser(id)
        return res.status(200).json({
            code: data.errCode,
            message: data.errMessage,
            user: data.user ? data.user : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 1,
            message: 'Forbiden! Can not delete user'
        })
    }
}
const editUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(500).json({
                code: 1,
                message: 'Missing request parameters!',
            })
        }
        const data = await userService.updateUser(id, req.body)
        return res.status(200).json({
            code: data.errCode,
            message: data.errMessage,
            user: data.user ? data.user : {}
        })
    } catch (error) {
        return res.status(500).json({
            code: 1,
            message: 'Forbiden! Can not delete user'
        })
    }
}

module.exports = {
    login,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    editUser
}