import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkSchema: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access an invite link and redirect user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink(subscriberId)

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set('referrer', subscriberId)

      console.log(redirectUrl.toString())
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
