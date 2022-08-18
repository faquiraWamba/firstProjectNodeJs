import Joi from "joi";

export const schema = {
    name : Joi.string().required(),
    email: Joi.string().email().trim(true).required(),
    age : Joi.number().integer(),
    nameUpdate : Joi.string().optional(),
    emailUpdate: Joi.string().email().trim(true).optional(),
    ageUpdate : Joi.number().integer().min(1).optional(),
    password : Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)),
}

