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

type RoleEnum = 'admin' | 'moderator'

const rolesMap: Record<RoleEnum, string> = {
  admin: '640496359622836245',
  moderator: '740396359624836245'
}

export const allowedRole = (role: RoleEnum) =>
  defineMiddleware((message, _, next) => {
    if (message.member.roles.cache.has(rolesMap[role])) {
      next()
    }
  })
```

#### `ping.ts`
```ts
import { defineCommand } from 'drake-bot'
import { allowedRole } from './allowed-role'

// per command middleware
export const ping = defineCommand('ping')(allowedRole('admin'), (message) => {
  message.reply('pong')
})
```

#### `mute-clown.ts`
```ts
import { defineMiddleware } from 'drake-bot'

export const muteClown = (target: string) =>
  defineMiddleware((message, _, next) => {
    if (message.member.id === target) {
      const muteRole = message.guild.roles.find(role => role.name === "mute")

      message.member.roles.addRole(muteRole.id)
    }

    next()
  })
```

#### `bot.ts`
```ts
import { Client } from 'discord.js'
import {
  createApp,
  defaultMiddlewares,
  defineCommand
} from 'drake-bot'
import { ping } from './ping'
import { muteClown } from './mute-clown'

const app = createApp(Client, {
  commands: [ping],
  // global middlewares
  middlewares: [...defaultMiddlewares, muteClown('415237965359349770')],
})

// or you can add global middleware like that
app.use(muteClown('415237965359349770'))

// set prefix default !
app.setPrefix('.')

app.on('ready', () => {
  console.log(`Logged in as ${app.client.user?.username}`)
})

app.login(process.env.DISCORD_BOT_TOKEN)
```
