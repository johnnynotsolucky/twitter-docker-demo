import xs from 'xstream'
import Twitter from 'twitter'

const makeTwitterDriver = (options) => {
  const client = new Twitter(options)

  return function twitterDriver(input$) {
    return input$
      .map(screenName =>
        xs.create({
          start: (listener) => {
            const params = { screen_name: screenName };
            client.get('statuses/user_timeline', params, (err, tweets) => {
              if (!err) {
                listener.next({
                  user: screenName,
                  tweets
                })
              } else {
                listener.error(err)
              }
            })
          },
          stop: () => { /*  */ }
        })
        .replaceError(error => xs.of({
            user: screenName,
            error
          })
        )
      )
      .flatten()
  }
}

export default makeTwitterDriver
