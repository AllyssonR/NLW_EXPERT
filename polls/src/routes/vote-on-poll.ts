import z from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
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
    let { sessionId } = request.cookies
    if (!sessionId) {
      sessionId = randomUUID()
    }
    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      signed: true,
      httpOnly: true,
    })

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptonId,
      },
    })

    return reply.status(201).send({ sessionId })
  })
}
