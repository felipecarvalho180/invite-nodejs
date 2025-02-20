import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map(subscriber => ({
      ...subscriber,
      score: subscriberIdAndScore[subscriber.id],
    }))
    .sort((a, b) => b.score - a.score)

  return {
    ranking: rankingWithScore,
  }
}
