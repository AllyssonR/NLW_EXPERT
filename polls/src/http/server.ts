import { fastify } from 'fastify'
import { createPoll } from '../routes/create-poll'
import { getPoll } from '../routes/get-poll'
import { voteOnPoll } from '../routes/vote-on-poll'
import { fastifyWebsocket } from '@fastify/websocket'
import cookie from '@fastify/cookie'
import { pollResults } from '../ws/poll-results'

const app = fastify()
app.register(fastifyWebsocket)
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)
app.register(cookie, {
  secret: 'poll-nlw',
  hook: 'onRequest',
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server listening on')
})
