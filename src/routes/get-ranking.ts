import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get the ranking of subscribers',
        tags: ['ranking'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const { ranking } = await getRanking()

      return { ranking }
    }
  )
}
