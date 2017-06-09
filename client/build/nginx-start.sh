#!/bin/bash

if [ "$APP_ENV"="local" ]
then
    mv env.remote.js env.js
    apiUrl=$(echo $API_URL | sed 's/\//\\\//g')
    sed -i "s/%api_url%/$apiUrl/" env.js
fi

nginx -g "daemon off;"
