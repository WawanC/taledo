FROM node:alpine
ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}
WORKDIR /usr/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "start"]