import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get the position of a subscriber in the ranking',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition(subscriberId)

        return { position }
      }
    )
  }
