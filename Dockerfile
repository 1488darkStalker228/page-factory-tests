# Берём за основу образ Homebrew на Ubuntu 22.04, это нужно для установки allure;
FROM homebrew/brew

# Homebrew создаёт внутри себя пользователя linuxbrew. Временно переключаемся на рута, для запуска нижеперечисленных команд;
USER root

#Настройка окружения для возможности запуска тестов внутри контейнера;
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=America/Los_Angeles
ARG DOCKER_IMAGE_NAME_TEMPLATE="mcr.microsoft.com/playwright:v%version%-jammy"
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
RUN apt-get update && \
    apt-get install -y curl wget gpg ca-certificates && \
    mkdir -p /etc/apt/keyrings && \
    curl -sL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" >> /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y --no-install-recommends git openssh-client && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/*
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
COPY ./playwright-core.tar.gz /tmp/playwright-core.tar.gz
RUN mkdir /ms-playwright && \
    mkdir /ms-playwright-agent && \
    cd /ms-playwright-agent && npm init -y && \
    npm i /tmp/playwright-core.tar.gz && \
    npm exec --no -- playwright-core mark-docker-image "${DOCKER_IMAGE_NAME_TEMPLATE}" && \
    npm exec --no -- playwright-core install --with-deps && rm -rf /var/lib/apt/lists/* && \
    if [ "$(uname -m)" = "aarch64" ]; then \
        rm /usr/lib/aarch64-linux-gnu/gstreamer-1.0/libgstwebrtc.so; \
    else \
        rm /usr/lib/x86_64-linux-gnu/gstreamer-1.0/libgstwebrtc.so; \
    fi && \
    rm /tmp/playwright-core.tar.gz && \
    rm -rf /ms-playwright-agent && \
    rm -rf ~/.npm/ && \
    chmod -R 777 /ms-playwright

#Меняет владельца папки app на linuxbrew, так как тесты не работают если владелец root;
COPY --chown=linuxbrew:linuxbrew . /app
WORKDIR /app
USER linuxbrew
RUN brew install allure

