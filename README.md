# Drake-bot

## Installation

```bash
# If you use npm:
npm install drake-bot

# Or if you use Yarn:
yarn add drake-bot
```

## Example usage

#### `allowed-role.ts`
```ts
import { defineMiddleware } from 'drake-bot'

const rolesMap = {
  admin: '640496359622836245',
  moderator: '740396359624836245'
}

export const allowedRole = (role) => defineMiddleware((message, _, next) => {
  if (message.member.roles.cache.has(rolesMap[role])) {
    next()
  }
})
```

#### `ping.ts`
```ts
import { defineCommand } from 'drake-bot'
import { allowedRole } from './allowed-role'

export const ping = defineCommand('ping')(allowedRole('admin'), (message) => {
  message.reply('pong')
})
```

```ts
import { Client } from 'discord.js'
import {
  createApp,
  defaultMiddlewares,
  defineCommand
} from 'drake-bot'
import { ping } from './ping'

const app = createApp(Client, {
  commands: [ping],
  middlewares: [...defaultMiddlewares],
})

app.on('ready', () => {
  console.log(`Logged in as ${app.client.user?.username}`)
})

app.login(process.env.DISCORD_BOT_TOKEN)
```
