FROM oven/bun:1.2.2-slim

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./Bun.lock ./Bun.lock

COPY ./package.json ./package.json
COPY .turbo.json ./turbo.json

COPY ./apps/websocket ./apps/websocket




RUN bun install
RUN bun run db:migrate

EXPOSE 8080

CMD  ["bun","run", "start:websocket"]