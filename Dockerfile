FROM node:14.15.4-alpine

ENV NODE_ENV="production"
ENV REACT_APP_BACKEND_URL="https://site-op2heymbrq-uc.a.run.app/api"

WORKDIR /app

COPY . /app

RUN yarn

RUN yarn backend:build

RUN yarn frontend:build

CMD ["yarn", "cloudrun"]