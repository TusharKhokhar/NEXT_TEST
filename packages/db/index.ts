/// <reference types="./types" />

import { PrismaClient } from '@prisma/client'
import { getSecretValue } from './utils'

// Prevent multiple instances of Prisma Client in development
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.MODE !== 'production') global.prisma = prisma

export const getPrismaClientAsync = async (DATABASE_NAME: string) => {
  const secretName =
    process.env.MODE === 'development'
      ? 'local_database_cred'
      : 'database_cred'

  const secrets = await getSecretValue(secretName)
  const {
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
  } = secrets

  const client = new PrismaClient({
    datasources: {
      db: {
        url: `mysql://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
      },
    },
  })
  return client
}

export default prisma

export const getPrismaClientSync = (
  DATABASE_USER_NAME: string,
  DATABASE_PASSWORD: string,
  DATABASE_HOST: string,
  DATABASE_PORT: string,
  DATABASE_NAME: string
) => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `mysql://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
      },
    },
  })
  return client
}
