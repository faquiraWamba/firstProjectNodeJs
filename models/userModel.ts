import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();

export const USERROLE = {
    admin : 1,
    user : 2
}

export const User = prisma.user

