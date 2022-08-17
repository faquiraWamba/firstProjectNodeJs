import Joi from "joi";
import { schema } from "../utils/schema";

export const registerSchema = Joi.object({
    name : schema.name,
    email : schema.email,
    age: schema.age
})