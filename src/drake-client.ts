import type {
  Client as DiscordClient,
  ClientOptions,
  Message as DiscordMessage,
} from 'discord.js'

import type { Command, Handler } from './command-manager'
import { CommandManager } from './command-manager'
import { MiddlewareManager } from './middleware-manager'
import { parseMessage, runHandlersQueue } from './utils'

export type Options = {
  clientOptions?: ClientOptions
  commands: Command[]
  middlewares?: Handler[]
}

export class DrakeClient {
  private prefix = '!'
  private commandManager = new CommandManager()
  private middlewareManager: MiddlewareManager
  public client!: DiscordClient
  public on!: DiscordClient['on']

  constructor(client: DiscordClient, options: Options) {
    this.client = client
    this.on = client.on.bind(client)
    this.commandManager.registerCommands(options.commands)
    this.middlewareManager = new MiddlewareManager(options.middlewares)
  }

  private listen = async (discordMessage: DiscordMessage) => {
    const message = parseMessage(discordMessage, this.prefix)

    const command = await runHandlersQueue(
      message,
      this.middlewareManager.getMiddlewares(),
      this.client
    )

    if (!command) return

    runHandlersQueue(
      message,
      this.commandManager.getCommandByName(command),
      this.client
    )
  }

  public use = (middleware: Handler) => {
    this.middlewareManager.addMiddleware(middleware)

    return this
  }

  public command = (command: Command) => {
    this.commandManager.registerCommand(command)

    return this
  }

  public setPrefix = (prefix: string) => {
    this.prefix = prefix
  }

  public login = (token?: string) => {
    this.on('message', this.listen)
    this.client.login(token)
  }
}
