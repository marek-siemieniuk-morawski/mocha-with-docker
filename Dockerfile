FROM node:13-slim

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm ci

RUN chmod +x /usr/src/app/run.sh

ENTRYPOINT [ "./run.sh" ]
