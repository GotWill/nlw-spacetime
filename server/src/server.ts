import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'

const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('listening on port 👌')
  })
