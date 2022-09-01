import { Request, Response } from "express";
import { postCreateSchema, postUpdateSchema } from "../validation/postValidation";
import { Post } from "../models/postModel";
import  PostInterface from "../interfaces/postInterface";
import { Image } from "../models/imgModel";

class PostController{

    public async CreatePost(req:Request, res:Response){

        try{
                console.log(req.files)
                const files : any = req.files
                let data : PostInterface.IpostCreate= req.body;
                let authorId : number = parseInt(req.body.authorId)
                let price : number = parseInt(req.body.price)
                console.log(req.body)
                const validate = postCreateSchema.validate(data, { abortEarly: false })

                if(!validate.error){
                    const image = []
                    for (let item of files){
                        image.push({hash: item.filename})
                    }
                    let postCreate = await Post.create(
                        { 
                            data: {
                                title : data.title,
                                price: price,
                                authorId: authorId,
                                images :{
                                    create: image
                                }
                            },include :{
                                images: true
                            }
                        })

                    
                    if(!postCreate){
                        res.status(403).json({
                            msg:' error creating Post'})
                    }else{

                        res.status(200).json({
                            msg : 'Post create',
                            user : postCreate
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
        catch(error:any){
            res.status(400).json({
                msg : "exception",
                error: error
            })
        }
    }

    public async listPost (req:Request, res:Response){
        try{
            const posts = await Post.findMany({
                include : {
                    images: true
                }
            });

            if(!posts){
                res.status(500).send(' server error')
            }else{
                res.status(200).json({
                    msg : "liste des posts",
                    postList : posts
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

    public async getPost (req: Request, res:Response){
        try{
            let id = parseInt(req.params.id)
            let getPost = await Post.findFirst({
                where :{id}
            })

            if(!getPost){
                res.status(400).json({
                    msg:"the post does'nt exists"
                })
            }
            else{
                res.status(200).json({
                    msg:"your post",
                    postInformations:getPost
                })
            }
        }
        catch(error:any){
            res.status(400).json({
                msg:"exception",
                error: error.details
            })
        }
    }

    public async updatePost (req:Request, res:Response){
        try{
            let id  = parseInt(req.params.id)
            const findPost = await Post.findUnique({
                where : {id : id} 
            })
            if(!findPost){
                res.status(404).json({msg:'Post not found'})
            }
            else{
                let postNewInformation : PostInterface.IpostUpdate = req.body
                const validate = postUpdateSchema.validate(postNewInformation, { abortEarly: false })
                if(!validate.error){
                    const postupdate = await Post.update({
                        where: {id: findPost.id},
                        data:postNewInformation
                    })
    
                    if(!postupdate){
                        res.status(400).json({msg:'Post informations not update'})
                    }else{
                        res.status(200).json({
                        msg : "post updated with success",
                        postupdate : postupdate
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
        catch(error:any){
            res.status(400).json({
                msg:"exception",
                error: error.details
            })
        }
       
    }

public async deletePost(req:Request, res:Response) {
    try{
        let id = parseInt(req.params.id)
   
        const postfound = await Post.findUnique({
            where :{id}
        })
        
        if(!postfound){
            res.status(400).json({msg:'post not found'})
        }else{
            /*const imageDelete = await Image.delete({
                where:{postId : postfound.id}
            })*/
            const postDelete = await Post.delete({
                where :{id : postfound.id}
            })

            
            if(postDelete){
                res.status(200).json({
                    msg : "post deleted",
                    post:postDelete
                })
            }
            else{
                res.status(500).json({
                    msg:"server error"
                })
            }
           
        }
    }
    catch(error:any){
        res.status(400).json({
            msg:"exception",
            error: error.details
        })
    }
   
}

}
export let postCtrl = new PostController()
