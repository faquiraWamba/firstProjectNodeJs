import Joi from "joi";
import { schema } from "../utils/schema";

export const postCreateSchema = Joi.object({
    title : schema.title,
    price : schema.price,
    authorId : schema.authorIdPost
})
export const postUpdateSchema = Joi.object({
    title : schema.titleUpdate,
    price : schema.priceUpdate
})