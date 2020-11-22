import type { Message as DiscordMessage } from 'discord.js'

import type { Handler, Command } from './command-manager'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DrakeMessage<T = any, C = any> = DiscordMessage & {
  params: T
  prefix: string
  command: string
  ctx?: C
}

export const defineCommand = (...commandNames: string[]) => (
  ...handlers: Handler[]
): Command => {
  return {
    commandNames,
    handlers,
  }
}
