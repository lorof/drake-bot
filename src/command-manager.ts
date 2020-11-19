import type { Client } from 'discord.js'

import type { DrakeMessage } from './define-command'

export type Handler = (
  msg: DrakeMessage,
  client: Client,
  next: (arg?: string) => void
) => Promise<void> | void

export type Command = {
  commandNames: string[]
  handlers: Handler[]
}

export class CommandManager {
  private commands: Record<string, Handler[]> = {}

  public registerCommands = (commands: Command[]) => {
    commands.forEach(this.registerCommand)
  }

  public registerCommand = (command: Command) => {
    const { commandNames, handlers } = command

    commandNames.forEach((commandName) => {
      this.commands[commandName] = handlers
    })
  }

  public getCommandByName = (commandName: string): Handler[] => {
    return this.commands[commandName] ?? []
  }
}
