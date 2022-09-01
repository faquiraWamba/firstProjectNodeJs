import express,{ Request, Response} from "express"
import {body, validationResult} from "express-validator"
import { PrismaClient} from "@prisma/client"
import { userCtrl } from "../controller/userController";
import { postCtrl } from "../controller/postController";
import multer from "multer"
import path from "path";
import checkAuthorization  from "../middleware/auth";

const storage = multer.diskStorage({
    destination:(req:Request, file, cb) =>{
        cb(null, "images")
    },
    filename: (req:Request, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage : storage})
const prisma = new PrismaClient();

const apiRouter:express.Router = express.Router()


apiRouter.post('/register', userCtrl.createUser)

apiRouter.post('/login', userCtrl.connectUser)

apiRouter.post('/createPost', upload.array('images',5), postCtrl.CreatePost)

apiRouter.get('/listPost', checkAuthorization, postCtrl.listPost)

apiRouter.get('/getPost/:id', postCtrl.getPost)

apiRouter.put('/updatePost/:id', postCtrl.updatePost)

apiRouter.delete('/deletePost/:id', postCtrl.deletePost)

/*apiRouter.get('/getUser', userCtrl.userList)

apiRouter.get('/find/:id', userCtrl.findUser)

apiRouter.put('/update/:id', userCtrl.updateUser)

apiRouter.delete('/delete/:id', userCtrl.deleteUser)*/


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


