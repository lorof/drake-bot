import type { Handler } from './command-manager'

export type Middleware = Handler
export class MiddlewareManager {
  private middlewares: Middleware[] = []

  constructor(middlewares: Middleware[] = []) {
    this.middlewares = middlewares
  }

  public addMiddleware = (middleware: Middleware) => {
    this.middlewares.push(middleware)
  }

  public getMiddlewares = () => {
    return this.middlewares
  }

  public middlewareCount = () => {
    return this.middlewares.length
  }
}
