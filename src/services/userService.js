import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

const createUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist
            const user = await findOneUserByConditions({ email: body.email })
            if (user) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is not exist on our system. Plz try other email!'
                })
                return
            }
            const hashPass = await hashUserPassword(body.password)
            const newUser = await db.User.create({
                email: body.email,
                password: hashPass,
                firstName: body.firstName,
                lastName: body.lastName,
                address: body.address,
                phoneNumber: body.phoneNumber,
                gender: body.gender === '1' ? true : false,
                // image: user.image,
                roleId: body.roleId,
                // positionId: user.positionId,
                createdAt: new Date(),
                updatedAt: new Date()

            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                user: newUser
            })
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

const updateUser = async (id, body) => {
    id = parseInt(id)
    return new Promise(async (resolve, reject) => {
        try {
            // const user = await db.User.findOne({ where: { id } })
            const newValues = {}
            if (body.firstName) newValues.firstName = body.firstName
            if (body.lastName) newValues.lastName = body.lastName
            if (body.address) newValues.address = body.address
            if (body.gender) newValues.address = body.gender === '1' ? true : false
            if (body.phoneNumber) newValues.phoneNumber = body.phoneNumber
            const data = await db.User.update({ ...body }, { where: { id } })
            if (data[0] === 1) {
                resolve({ errCode: 0, errMessage: 'Update user successfull' })
            } else {
                resolve({ errCode: 1, errMessage: 'User is not existing!' })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedUser = await db.User.destroy({ where: { id: id } })
            if (deletedUser === 1) {
                resolve({ errCode: 0, errMessage: 'Ok' })
            } else {
                resolve({ errCode: 1, errMessage: 'User is not existing!' })
            }

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