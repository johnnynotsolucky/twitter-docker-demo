#!/bin/bash

(cd /usr/src && npm run watch) &
nginx -g "daemon off;"
