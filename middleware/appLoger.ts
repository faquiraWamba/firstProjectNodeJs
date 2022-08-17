import express, {Request, Response, NextFunction} from "express";

let appLoger = (req:Request, res:Response, next:NextFunction)=>{

    //url, method, time, data

    let url = req.url;
    let method = req.method;
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let result : string = `[${url}] [${method}] [${time}] [${date}]`
    console.log(result)

    next()
}



export default appLoger;