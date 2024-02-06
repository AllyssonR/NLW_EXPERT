import { fastify } from "fastify";
import { createPoll } from "../routes/create-poll";
import { getPoll } from "../routes/get-poll";
import { voteOnPoll } from "../routes/vote-on-poll";
import cookie from'@fastify/cookie'


const app = fastify();

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(cookie,{
  secret:'poll-nlw',// for cookies signature
  hook:'onRequest', //set to false to disable  cookie autoparsing or set autoparsing
  parseOptions:{} //options for parsing cookies
})



app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server listening on");
});
