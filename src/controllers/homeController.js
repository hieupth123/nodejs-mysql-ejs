import db from "../models"
const getHomPage = async (req, res) => {
    // return res.send("Hello from controller")
    try {
        const users = await db.User.findAll()
        return res.render('homepage.ejs', { users: JSON.stringify(users) })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getHomPage: getHomPage
}