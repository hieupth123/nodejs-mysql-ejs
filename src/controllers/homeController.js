const getHomPage = (req, res) => {
    // return res.send("Hello from controller")
    return res.render('homepage.ejs')
}

module.exports = {
    getHomPage: getHomPage
}