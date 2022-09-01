import Joi from "joi";
import { join } from "path";

export const schema = {
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    sexe : Joi.string().required(),
    email: Joi.string().email().trim(true).required(),
    age : Joi.number().integer(),
    updateAt : Joi.date().required(),
    nameUpdate : Joi.string().optional(),
    emailUpdate: Joi.string().email().trim(true).optional(),
    ageUpdate : Joi.number().integer().min(1).optional(),
    password : Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)),
    logPassword : Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    titleUpdate: Joi.string().optional(),
    priceUpdate : Joi.number().optional(),
    authorIdPost : Joi.number().required()
}

