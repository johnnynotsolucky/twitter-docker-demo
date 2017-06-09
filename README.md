### Server

```
$ cd /path/to/src/server
$ npm run build:docker
$ docker run -p 8080:8080 johnnynotsolucky/twitter-demo-server:latest
```

### Client

#### Dev

```
$ cd /path/to/src/client
$ npm run build:docker
$ docker run -d \
    -p 80:80 \
    -v /path/to/src/client/env.js:/usr/share/nginx/html/env.js \
    -v /path/to/src/client/dist:/usr/share/nginx/html \
    johnnynotsolucky/twitter-demo-client:latest
# npm run watch
```

#### "Production"
```
$ cd /path/to/src/client
$ npm run build:docker
$ docker run -d \
    -p 80:80 \
    -e APP_ENV=production \
    -e API_URL=http://localhost:8080 \
    johnnynotsolucky/twitter-demo-client:latest
```

### Deploy

#### Server
```
now -e CONSUMER_KEY=<consumer_key> \
    -e CONSUMER_SECRET=<consumer_secret> \
    -e ACCESS_TOKEN_KEY=<access_token_key> \
    -e ACCESS_TOKEN_SECRET=<access_token_secret> \
    --docker \
    --public
```

#### Client

```
now -e APP_ENV=production \
    -e API_URL=https://server-url.now.sh \
    --docker \
    --public
```