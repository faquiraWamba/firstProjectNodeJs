import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();



export const Post = prisma.post