import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'

const connectionString = `${process.env.DATABASE_URL}`

let prisma: PrismaClient

const prismaClient = () => {
  if (!prisma) {
    const adapter = new PrismaPg({ connectionString })
    prisma = new PrismaClient({ adapter })
  }

  return prisma
}

export { prismaClient, PrismaClient }