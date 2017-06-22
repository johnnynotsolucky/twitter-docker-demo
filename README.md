### Dev

Create `server/.env` with the following content:

```
CONSUMER_KEY=<twitter consumer key>
CONSUMER_SECRET=<twitter consumer secret>
ACCESS_TOKEN_KEY=<twitter access token>
ACCESS_TOKEN_SECRET=<twitter access token secret>
```

Run the following commands

```
docker-compose build
docker-compose up
```

Browse to [](http://localhost)


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
