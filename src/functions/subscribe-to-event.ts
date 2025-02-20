import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

interface SubscribeToEventsProps {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvents({
  name,
  email,
  referrerId,
}: SubscribeToEventsProps) {
  const existingSubscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (existingSubscribers.length > 0) {
    return {
      subscriberId: existingSubscribers[0].id,
    }
  }

  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning()

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscriberId = result[0].id

  return {
    subscriberId,
  }
}
