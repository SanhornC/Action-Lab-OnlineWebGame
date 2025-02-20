FROM node:20 AS base
WORKDIR /usr/local/app

FROM base AS client-base
COPY client/package.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install --force
COPY client/vite.config.js client/index.html client/.env.* ./
COPY client/public ./public
COPY client/src ./src

FROM client-base AS client-dev
CMD ["npm", "start"]

FROM base AS server-dev
COPY server/package.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install --force
COPY server/.env.* ./
COPY server/src ./src
CMD ["npm", "start"]