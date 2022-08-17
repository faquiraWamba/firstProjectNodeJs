import express,{ Request, Response,Application} from "express";
import apiRouter from "./route/router";
import appLoger from "./middleware/appLoger";

const app: Application = express();

const port : number = 8080;
const hostname : string = "localhost"||"127.0.0.1";

//form data configuration
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//configure middleware for log
app.use(appLoger);

//server creation
app.get('/', (req :Request, res:Response)=>{
    res.status(200).send('server express nodejs')
})

//express router configuration
app.use('/api', apiRouter)

//server listenning
app.listen(port, hostname, () =>{
    console.log(`server is listening on http://${hostname}:${port}`);
})