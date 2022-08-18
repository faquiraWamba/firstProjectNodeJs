import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import UserInterface from "../interfaces/userInterface";
import { registerSchema, updateSchema } from "../validation/userValidation";

const prisma = new PrismaClient();
class UserController{

    public async createUser(req:Request, res:Response){
            let data : UserInterface.IuserCreate = req.body;
            const validate = registerSchema.validate(data, { abortEarly: false })
            
            if(!validate.error){
                const existingUser = await prisma.user.findFirst({
                    where:{email: data.email}
                });   
                if (existingUser) {
                    res.status(403).json( {
                        msg:"User Already Exists"});
                }else{
                    const userCreate = await prisma.user.create({ data });
            
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

    public async userList (req:Request, res:Response){
        try{
            const users = await prisma.user.findMany();

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
        const userInfo = await prisma.user.findUnique({
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
            const foundUser = await prisma.user.findUnique({
                where : {id : id} 
            })
            if(!foundUser){
                res.status(400).send('user not found')
            }
            else{
                let userNewData : UserInterface.IuserUpdate = req.body
                const validate = updateSchema.validate(userNewData, { abortEarly: false })
                if(!validate.error){
                    const userNewInformation = await prisma.user.update({
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
        const userDeletete = await prisma.user.delete({
            where :{id}
        })
        if(!userDeletete){
            res.status(400).send('user not found')
        }else{
            res.status(200).json({
            msg : "user deleted"})
        }
    }
}
 
export let userCtrl = new UserController;