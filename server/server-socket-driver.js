import xs from 'xstream'
import IO from 'socket.io'
import {adapt} from '@cycle/run/lib/adapt'
import { doNothing } from './utils'

export default function makeServerSocketDriver (server) {
  const io = IO(server)

  const serverEvent$ = xs.create({
    start(listener) {
      const connect = socket =>
        listener.next({
          name: 'connect',
          client: socket
        })
      io.on('connection', connect)
      io.on('connect', connect)

      const disconnect = reason =>
        listener.next({
          name: 'disconnect',
          reason
        })
      io.on('disconnect', disconnect)
      io.on('disconnecting', disconnect)

      io.on('error', err =>
        listener.next({
          name: 'error',
          error: err
        })
      )
    },
    stop() { /* noOp */ }
  })

  const select = event =>
    adapt(serverEvent$
    .filter(({ name }) => name === 'connect')
    .map(({ client }) => xs.create({
      start: listener =>
        client &&
        client.on(event, data =>
          listener.next({ event, client, data })),
      stop() { /* noOp */ }
    }))
    .flatten())

  function socketIODriver (input$) {
    input$
    .map(({ event, args }) => io.emit(event, args))
    .subscribe(doNothing)

    return {
      server: adapt(serverEvent$),
      select
    }
  }

  return socketIODriver
}