
FROM node:lts-alpine
RUN apk add --no-cache curl
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY src src

COPY tsconfig.json tsconfig.json

CMD npm start