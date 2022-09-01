import { NextFunction, Request, Response } from "express";
import { Token } from "../models/tokenModel";

const checkAuthorization  = async (req:Request, res:Response, next:NextFunction) => {
    try{

        // check authorization
        let token = req.headers.authorization

        if(!token){
            res.status(400).json({
                error: "not Authorization"
            })
        }else{
           const foundToken = await Token.findFirst({
             where : {jwt : token}
           }) 

           if(!foundToken){
                res.status(400).json({
                    error: "invalid Token"
                })
           }else{
                if(foundToken.expiredAt < new Date()){
                    res.status(400).json({
                        error: "Expired Token"
                    })
                }
                else{
                    next();
                }
           }
        }

        
    }catch(err){
        res.status(401).json({
            err
        })
    }

}

export default checkAuthorization





























