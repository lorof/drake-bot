import { Client } from 'discord.js'

import { createApp, defaultMiddlewares } from '../src'
import { ping } from './ping'

const app = createApp(Client, {
  commands: [ping],
  middlewares: [...defaultMiddlewares],
})

app.on('ready', () => {
  console.log(`Logged in as ${app.client.user?.username}`)
})

app.login(process.env.DISCORD_BOT_TOKEN)
