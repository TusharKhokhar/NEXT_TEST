import { createClient } from 'redis';

export const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('ready', () => console.log('Connected to Redis server!'))

client.connect();

export const set = async (key: string, value: any, expireIn: number) => {
  try {
    key = `matter:${key}`
    if (expireIn > 0) {
      return await client.set(key, value, { EX: expireIn })
    }
    return await client.set(key, value)
  } catch (e) {
    console.error(`error setting redis ${key}: ${e}`)
  }
}

export const get = async (key: string) => {
  try {
    key = `matter:${key}`
    return await client.get(key)
  } catch (e) {
    console.error(`error getting redis ${key}: ${e}`)
  }
}

export const remove = async (key: string) => {
  try {
    key = `matter:${key}`
    return await client.del(key)
  } catch (e) {
    console.error(`error deleting redis ${key}: ${e}`)
  }
}