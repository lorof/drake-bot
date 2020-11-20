import type { Client as DiscordClient } from 'discord.js'

import { defaultMiddlewares } from './default-middlewares'
import { DrakeClient, Options } from './drake-client'

const defaultOptions = {
  middlewares: defaultMiddlewares,
}

export const createApp = (client: typeof DiscordClient, options: Options) => {
  const _options = {
    ...defaultOptions,
    ...options,
  }

  const drakeClient = new DrakeClient(
    new client(_options.clientOptions),
    _options
  )

  return drakeClient
}
