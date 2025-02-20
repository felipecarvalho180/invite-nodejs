import { redis } from '../redis/client'

export async function getSubscriberRankingPosition(subscriberId: string) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)
  console.log(rank)
  console.log(subscriberId)
  return {
    position: rank === null ? null : rank + 1,
  }
}
