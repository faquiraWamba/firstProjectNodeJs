import bcrypt from "bcryptjs"
import { Request, Response } from "express";
import UserInterface from "../interfaces/userInterface";
import { registerSchema, updateSchema, loginSchema } from "../validation/userValidation";
import { User, USERROLE } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Token } from "../models/tokenModel";


class UserController{

    public async createUser(req:Request, res:Response){
            let data : UserInterface.IuserCreate = req.body;
            const validate = registerSchema.validate(data, { abortEarly: false })
            
            if(!validate.error){
                const existingUser = await User.findFirst({
                    where:{email: data.email}
                });   
                if (existingUser) {
                    res.status(403).json( {
                        msg:"User Already Exists"});
                }else{
                    
                    let salt = bcrypt.genSaltSync(parseInt(<string>process.env.SALT));
                    let hash = bcrypt.hashSync(data.password, salt);

                    data.password = hash
                    data.role = USERROLE.user
                    const userCreate = await User.create({ data });
            
                    if(!userCreate){
                        res.status(403).json({
                            msg:' error creating user'})
                    }else{
                        res.status(200).json({
                            msg : 'User create',
                            user : userCreate
                        })
                    }
                }
            }else{
                res.status(422).json({
                    msg : 'validation error',
                    error : validate.error.details
                })
            }
        
    }

    public async connectUser (req:Request, res: Response ) {
        
        let data : UserInterface.IuserConnect = req.body;
        const validate = loginSchema.validate(data, { abortEarly: false })
        

        let password = req.body.password
        let email  = req.body.email

        if (!validate.error){
            const userData = await User.findFirst({
                where : {email}
            });
            
            
            if(!userData ){
                res.status(400).json({
                    msg : "user not found"
                })
            }else{


                bcrypt.compare(password, userData.password, async (err, result) =>{
                    if(result){
                        let payload = {
                            email : userData.email,
                            id: userData.id,
                            role: userData.role
                        }
                        const token = jwt.sign(payload, <string>process.env.TOKEN,{
                            expiresIn : "48h"
                        })

                        let tokenCreation = await Token.create({
                            data: {
                                    jwt : token,
                                    expiredAt : new Date(Date.now() + (parseInt(<string> process.env.TOKEN_DAY_VALIDITY)*22*60*60*1000)),
                                    authorId : userData.id

                            } 
                        })

                        console.log(tokenCreation)
                        let jwtValue = tokenCreation.jwt
                        res.status(200).json({
                            msg : "user connected",
                            user : {...userData, token :jwtValue}
                        })
                    }else{
                        res.status(422).json({
                            msg : "invalid email and password"
                        })
                    }
                })
            }
        }
        else{
            res.status(422).json({
                msg : 'validation error',
                error : validate.error.details
            })
        }
        
    }

    


    /*public async userList (req:Request, res:Response){
        try{
            const users = await User.findMany();

            if(!users){
                res.status(500).send('internal server error')
            }else{
                res.status(200).json({
                    msg : "listes des utilisateurs",
                    userList : users
                })
            }
        }
        catch(error:any){
            res.status(400).json({
                msg : "exception",
                error: error
            })
        }
        

    }

    public async findUser (req:Request, res:Response){
        let id  = parseInt(req.params.id)
        const userInfo = await User.findUnique({
            where : {id}
        });
        if(!userInfo){
            res.status(400).json({
                msg : "user not found"
            })
        }else{
            res.status(200).json({
                msg: 'informations',
                user : userInfo
            })
        }
    }

    public async updateUser (req:Request, res:Response){
       
            let id  = parseInt(req.params.id)
            const foundUser = await User.findUnique({
                where : {id : id} 
            })
            if(!foundUser){
                res.status(400).send('user not found')
            }
            else{
                let userNewData : UserInterface.IuserUpdate = req.body
                const validate = updateSchema.validate(userNewData, { abortEarly: false })
                if(!validate.error){
                    const userNewInformation = await User.update({
                        where: {id: foundUser.id},
                        data:userNewData
                    })
                    console.log (userNewInformation)
                    if(!userNewInformation){
                        res.status(400).send('user data not update')
                    }else{
                        res.status(200).json({
                        msg : "user updated with success",
                        userdataupdate : userNewInformation
                    })}
                }
                else{
                    res.status(422).json({
                        msg : "validation error",
                        error : validate.error.details
                    })
                }
            }
   
    }

    public async deleteUser(req:Request, res:Response) {
        let id = parseInt(req.params.id)
        const userDeletete = await User.delete({
            where :{id}
        })
        if(!userDeletete){
            res.status(400).send('user not found')
        }else{
            res.status(200).json({
            msg : "user deleted"})
        }
    }*/
}
 
export let userCtrl = new UserController;