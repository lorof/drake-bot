import { defineMiddleware } from './define-middleware'

export const checkBot = defineMiddleware((message, _, next) => {
  if (message.author.bot) return

  next()
})

export const checkPrefix = defineMiddleware((message, _, next) => {
  if (!message.content.startsWith(message.prefix)) return

  next()
})

export const defaultMiddlewares = [checkBot, checkPrefix]
