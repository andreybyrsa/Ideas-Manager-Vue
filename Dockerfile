FROM node:18.16.0 as build-stage

# Переменные окружения
ARG VUE_APP_AUTH_API_URL
ARG VUE_APP_INVITATION_API_URL
ARG VUE_APP_MANAGE_USERS_API_URL
ARG VUE_APP_IDEAS_API_URL
ARG VUE_APP_COMMENT_API_URL
ARG VUE_APP_MANAGE_GROUPS_API_URL
ARG VUE_APP_OAUTH_REDIRECT_URI
ARG VUE_APP_OAUTH_CLIENT_ID
ARG VUE_APP_OAUTH_AUTH_HEADER
ARG VUE_APP_OAUTH_URL
ARG VUE_APP_BACKEND_URL
ARG VUE_APP_LOGOUT_URL

# Установите переменные окружения
ENV VUE_APP_AUTH_API_URL=$VUE_APP_AUTH_API_URL
ENV VUE_APP_INVITATION_API_URL=$VUE_APP_INVITATION_API_URL
ENV VUE_APP_MANAGE_USERS_API_URL=$VUE_APP_MANAGE_USERS_API_URL
ENV VUE_APP_IDEAS_API_URL=$VUE_APP_IDEAS_API_URL
ENV VUE_APP_COMMENT_API_URL=$VUE_APP_COMMENT_API_URL
ENV VUE_APP_MANAGE_GROUPS_API_URL=$VUE_APP_MANAGE_GROUPS_API_URL
ENV VUE_APP_OAUTH_REDIRECT_URI=$VUE_APP_OAUTH_REDIRECT_URI
ENV VUE_APP_OAUTH_CLIENT_ID=$VUE_APP_OAUTH_CLIENT_ID
ENV VUE_APP_OAUTH_AUTH_HEADER=$VUE_APP_OAUTH_AUTH_HEADER
ENV VUE_APP_OAUTH_URL=$VUE_APP_OAUTH_URL
ENV VUE_APP_BACKEND_URL=$VUE_APP_BACKEND_URL
ENV VUE_APP_LOGOUT_URL=$VUE_APP_LOGOUT_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

# Добавьте вывод переменных окружения для отладки
RUN echo $VUE_APP_AUTH_API_URL && \
    echo $VUE_APP_INVITATION_API_URL && \
    echo $VUE_APP_MANAGE_USERS_API_URL && \
    echo $VUE_APP_IDEAS_API_URL && \
    echo $VUE_APP_COMMENT_API_URL && \
    echo $VUE_APP_MANAGE_GROUPS_API_URL && \
    echo $VUE_APP_OAUTH_REDIRECT_URI && \
    echo $VUE_APP_OAUTH_CLIENT_ID && \
    echo $VUE_APP_OAUTH_AUTH_HEADER && \
    echo $VUE_APP_OAUTH_URL && \
    echo $VUE_APP_BACKEND_URL && \
    echo $VUE_APP_LOGOUT_URL

RUN npm run build

FROM nginx as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf