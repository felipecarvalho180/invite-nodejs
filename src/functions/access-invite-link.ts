import { redis } from '../redis/client'

export async function accessInviteLink(subscriberId: string) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
