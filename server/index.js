import xs from 'xstream'
import { run } from '@cycle/run'
import { prop } from 'ramda'
import { createServer } from 'http'
import makeServerSocketDriver from './server-socket-driver'
import makeTwitterDriver from './twitter-driver'

const dataProp = prop('data')

const emitTweets = input$ =>
  input$
  .map(timeline => ({
    event: 'message',
    args: timeline
  }))

const main = (sources) => {
  const user$ = sources.Socket.select('message')
    .map(dataProp)

  const timeline$ = sources.Twitter
    .compose(emitTweets)

  return {
    Socket: timeline$,
    Twitter: user$
  }
}

const httpServer = createServer()

run(main, {
  Socket: makeServerSocketDriver(httpServer),
  Twitter: makeTwitterDriver({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  })
})

httpServer.listen(8080, () => console.log('Sockets available on port 8080'))
