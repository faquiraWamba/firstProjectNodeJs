import Joi from "joi";

export const schema = {
    name : Joi.string().alphanum().max(15).min(3).trim(true).optional(),
    email: Joi.string().email().trim(true),
    age : Joi.number().integer(),
    password : Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)),
}

