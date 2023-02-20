import userService from '../services/userService'

const login = async (req, res) => {
    const { email, password } = req.body
    console.log('email: ', email, '\npassword: ', password)
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

module.exports = {
    login
}