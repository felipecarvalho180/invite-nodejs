import { redis } from '../redis/client'

export async function getSubscriberInviteClicks(subscriberId: string) {
  const clicks = await redis.hget('referral:access-count', subscriberId)
  return {
    count: Number.parseInt(clicks ?? '0'),
  }
}
