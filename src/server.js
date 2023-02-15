import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initRoutes from './routes/route'
require('dotenv').config()

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initRoutes(app);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on the ${port}`)
})