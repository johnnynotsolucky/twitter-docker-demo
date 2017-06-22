/* globals API_URL */
import xs, { Stream } from 'xstream'
import debounce from 'xstream/extra/debounce'
import { run } from '@cycle/run'
import { makeDOMDriver, DOMSource, VNode } from '@cycle/dom'
import { div, label, input } from '@cycle/dom'
import { prop } from 'ramda'
import makeClientSocketDriver from './client-socket-driver'
import './main.styl'

const dataProp = prop('data')

const main = (sources) => {
  const user$ = sources.DOM.select('.user input').events('input')
    .map(ev => ev.target['value'])
    .map(screenName => ({
      event: 'message',
      data: screenName
    }))
    .compose(debounce(2000))
    .startWith({
      event: 'message',
      data: 'realdonaldtrump'
    })

  const message$ = sources.Socket.select('message')
    .map(dataProp)

  const vdom$ = message$
    .startWith(null)
    .map(timeline =>
      div('.container', [
        timeline
        ? div([
          div('.user', [
            label('@'),
            input({
              props: { value: timeline.user }
            })
          ]),
          div('.tweets',
            timeline.tweets.map(tweet =>
              div('.tweet', tweet.text)
            )
          )
        ])
        : div('Loading...')
      ])
    )

  return {
    DOM: vdom$,
    Socket: user$
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  Socket: makeClientSocketDriver({ url: API_URL })
})
