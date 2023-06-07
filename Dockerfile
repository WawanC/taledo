FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN yarn
RUN yarn turbo build
CMD ["yarn", "turbo", "start"]