import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

const createUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPass = await hashUserPassword(user.password)
            const newUser = await db.User.create({
                email: user.email,
                password: hashPass,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender === '1' ? true : false,
                // image: user.image,
                roleId: user.roleId,
                // positionId: user.positionId,
                createdAt: new Date(),
                updatedAt: new Date()

            })
            resolve(newUser)
        } catch (error) {
            reject(error)
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }

    })
}

const getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({ order: [['createdAt', 'ASC']], raw: true })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

const getUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id }, raw: true })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = async (userData) => {
    userData.id = parseInt(userData.id)
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: userData.id } })
            await db.User.update({
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                phoneNumber: userData.phoneNumber
            }, { where: { id: userData.id } })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.destroy({ where: { id: id } })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const userLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check userEmail 
            let userData = {};
            const user = await findOneUserByConditions({ email: email })
            if (user) {
                const check = await bcrypt.compareSync(password, user.password);
                console.log('check: ', check)
                if (check) {
                    userData = {
                        errCode: 0,
                        errMessage: 'Ok',
                        user: {
                            email: user?.email,
                            roleId: user?.roleId
                        }
                    }
                } else {
                    userData = {
                        errCode: 2,
                        errMessage: 'Wrong password!'
                    }
                }
                resolve(userData)
            } else {
                userData = {
                    errCode: 1,
                    errMessage: 'Your email is not exist on our system. Plz try other email!'
                }
                resolve(userData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const findOneUserByConditions = async (conditions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: conditions })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const findAllUsersByConditions = async (conditions) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.find({ where: conditions })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    userLogin
}