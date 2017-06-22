FROM nginx:latest

ENV apti "apt-get install -y "
RUN apt-get update -y
RUN $apti curl
RUN $apti gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN $apti nodejs

COPY ./package.json /usr/src/package.json
WORKDIR /usr/src
COPY . /usr/src
RUN npm install
RUN npm run build
RUN cp -a /usr/src/dist/. /usr/share/nginx/html
RUN cp -a /usr/src/build/env.remote.js /usr/share/nginx/html/env.remote.js

COPY ./build/nginx-start.sh /opt/bin/nginx-start.sh
RUN chmod +x /opt/bin/nginx-start.sh

EXPOSE 80

CMD /opt/bin/nginx-start.sh
