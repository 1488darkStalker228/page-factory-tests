FROM mcr.microsoft.com/playwright:v1.44.1-jammy

ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Europe/Moscow

RUN adduser node

COPY --chown=node:node . /app

WORKDIR /app

USER node

RUN npm ci
