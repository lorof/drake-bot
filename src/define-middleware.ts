import type { Middleware } from './middleware-manager'

export const defineMiddleware = (handler: Middleware) => {
  return handler
}
