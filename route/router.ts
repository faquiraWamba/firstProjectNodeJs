import express,{ Request, Response} from "express"
import {body, validationResult} from "express-validator"
import { PrismaClient} from "@prisma/client"
import { userCtrl } from "../controller/userController";



const prisma = new PrismaClient();

const apiRouter:express.Router = express.Router()



apiRouter.get('/getUser', userCtrl.userList)

apiRouter.post('/register', userCtrl.createUser)

apiRouter.get('/find/:id', userCtrl.findUser)

apiRouter.put('/update/:id', userCtrl.updateUser)

apiRouter.delete('/delete/:id', userCtrl.deleteUser)


/* 
    fields : name, email, password
*/
apiRouter.post('/login',[
    body('name').not().isEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').isLength({min:5}).withMessage('minimum 5')

],async(req:Request, res:Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    let {name, email, password} = req.body;
        try{
            res.status(200).json({
            user :{name, email,password}})
        }catch(error){
            console.error
        }}
    )
    



export default apiRouter


