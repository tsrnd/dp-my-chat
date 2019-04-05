FROM node:10.15.3-alpine

RUN mkdir -p node/dp-my-chat

ENV DIR node/dp-my-chat
ENV APP_PORT 3001

WORKDIR ${DIR}

ADD ./ node/dp-my-chat

RUN npm install -g concurrently typescript

EXPOSE ${APP_PORT}

CMD npm run dev