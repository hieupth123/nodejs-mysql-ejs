import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initRoutes from './routes/route'
require('dotenv').config()
import connectDB from './config/database'
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    // origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initRoutes(app);
connectDB();

const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server is running on the ${port}`)
})