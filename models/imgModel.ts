import {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient

export let Image = prisma.user