import { redis } from '../redis/client'

export async function getSubscriberInvitesCount(subscriberId: string) {
  const count = await redis.zscore('referral:ranking', subscriberId)
  return {
    count: Number.parseInt(count ?? '0'),
  }
}
