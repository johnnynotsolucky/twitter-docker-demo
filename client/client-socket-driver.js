import xs, { Stream, Listener } from 'xstream'
import { Driver } from '@cycle/run'
import * as Socket from 'socket.io-client'
import {adapt} from '@cycle/run/lib/adapt'
import { doNothing } from './utils'

const makeClientSocketDriver = (config) => {
  const socket = Socket(config.url, config.options)

  const select = event =>
    adapt(xs.create({
      start: listener =>
        socket.on(event, data =>
          listener.next({ socket, data })),
      stop() {
        socket.off(event)
      }
    }))

  return function socketIODriver (input$) {
    input$
    .map(({ event, data }) => socket.emit(event, data))
    .subscribe(doNothing)

    return {
      select
    }
  }
}

export default makeClientSocketDriver
