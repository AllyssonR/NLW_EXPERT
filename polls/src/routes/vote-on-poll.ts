import z from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollOptons = z.object({
      pollOptonId: z.string().uuid(),
    });
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });
    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptonId } = voteOnPollOptons.parse(request.body);
    console.log(request.body);
  

    return reply.status(201).send()
  });
}
