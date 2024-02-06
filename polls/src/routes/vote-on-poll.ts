import z from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollOptons = z.object({
      pollOptonId: z.string().uuid(),
    })
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })
    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptonId } = voteOnPollOptons.parse(request.body)

    const sessionId = randomUUID()

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      signed: true,
      httpOnly: true,
    })

    return reply.status(201).send()
  })
}
