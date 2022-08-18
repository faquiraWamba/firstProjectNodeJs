import Joi from "joi";

export class MyController {
    
    public validate(data:any, schema:Joi.ObjectSchema): boolean | object {
        const validation = schema.validate(data, { abortEarly: false })
        if(validation.error){
            return validation.error.details;
        }
        else{
            return true;
        }
    }
}