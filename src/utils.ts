import type {
  Message as DiscordMessage,
  Client as DiscordClient,
} from 'discord.js'
import * as _ from 'lodash'

import { Handler } from './command-manager'
import { DrakeMessage } from './define-command'

export const parseMessage = (
  discordMessage: DiscordMessage,
  prefix: string
) => {
  const messageContent = discordMessage.content.replace(new RegExp(prefix), '')

  const [command, params] = messageContent.split(' ')

  const message = Object.assign(discordMessage, {
    params,
    command,
    prefix,
  })

  return message
}

export const runHandlersQueue = async (
  message: DrakeMessage,
  handlers: Handler[],
  client: DiscordClient
) => {
  let canNext = true
  let command = message.command

  for (const handler of handlers) {
    if (!canNext) {
      break
    }

    canNext = false

    await handler(message, client, (arg?: string) => {
      if (_.isString(arg)) {
        command = arg
      }

      if (_.isEmpty(arg)) {
        canNext = true
      }
    })
  }

  if (!canNext) return

  return command
}
