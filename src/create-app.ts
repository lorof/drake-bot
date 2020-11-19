import type { Client as DiscordClient } from 'discord.js'

import { DrakeClient, Options } from './drake-client'

export const createApp = (client: typeof DiscordClient, options: Options) => {
  const drakeClient = new DrakeClient(
    new client(options.clientOptions),
    options
  )

  return drakeClient
}
