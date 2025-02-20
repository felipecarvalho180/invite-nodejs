import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get the number of invites on an invite link',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount(subscriberId)

        return { count }
      }
    )
  }
