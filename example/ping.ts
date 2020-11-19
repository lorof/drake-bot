import { defineCommand } from '../src'

export const ping = defineCommand('ping')((message) => {
  message.reply('pong')
})
