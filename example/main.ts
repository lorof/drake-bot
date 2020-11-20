import { Client } from 'discord.js'

import { createApp } from '../src'
import { ping } from './ping'

const app = createApp(Client, {
  commands: [ping],
})

app.on('ready', () => {
  console.log(`Logged in as ${app.client.user?.username}`)
})

app.login(process.env.DISCORD_BOT_TOKEN)
