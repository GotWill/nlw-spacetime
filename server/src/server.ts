import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import 'dotenv/config'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import { uploadsRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()
app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadsRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('listening on port 👌')
  })
