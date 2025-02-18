import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'

interface SubscribeToEventsProps {
  name: string
  email: string
}

export async function subscribeToEvents({
  name,
  email,
}: SubscribeToEventsProps) {
  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning()

  const subscriberId = result[0].id

  return {
    subscriberId,
  }
}
