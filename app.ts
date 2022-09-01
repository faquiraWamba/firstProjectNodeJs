import express,{ Request, Response,Application} from "express";
import apiRouter from "./route/router";
import appLoger from "./middleware/appLoger";
import cors from 'cors'
import dotenv from 'dotenv'; 
import bodyParser from "body-parser";

dotenv.config()

const app: Application = express();

const port: number = parseInt(<string>process.env.PORT);
const hostname : string = "127.0.0.1";

//form data configuration
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//configure middleware for log
app.use(appLoger);

//server creation
app.get('/', (req :Request, res:Response)=>{
    res.status(200).send('server express nodejs')
})

//configuring cors for cross origin request
app.use(cors())

// to get static file from server with host path
app.use(express.static("images"))


// support parsing of application/json type post data
app.use(bodyParser.json());

//express router configuration
app.use('/api', apiRouter)

//server listenning
app.listen( port, hostname, () =>{
    console.log(hostname)
    console.log(`server is listening on http://${hostname}:${port}`);
})