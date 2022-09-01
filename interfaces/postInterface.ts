namespace PostInterface{


    export interface IpostCreate{
        title : string
        price : number
        authorId : number
    }

    export interface IpostUpdate{
        title? : string
        price? : number
    }
}


export default PostInterface