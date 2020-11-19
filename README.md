# Drake-bot

## Installation

```bash
# If you use npm:
npm install drake-bot

# Or if you use Yarn:
yarn add drake-bot
```

## Example usage

```js
import { Client } from 'discord.js'
import {
  createApp,
  defaultMiddlewares,
  defineCommand
} from 'drake-bot'

const ping = defineCommand('ping')((message) => {
  message.reply('pong')
})


const app = createApp(Client, {
  commands: [ping],
  middlewares: [...defaultMiddlewares],
})

app.on('ready', () => {
  console.log(`Logged in as ${app.client.user?.username}`)
})

app.login(process.env.DISCORD_BOT_TOKEN)
```
