FROM node:alpine AS builder
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/client/dist /app/client/dist
COPY --from=builder /app/server/dist /app/server/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/turbo.json /app/turbo.json
COPY --from=builder /app/client/package.json /app/client/package.json
COPY --from=builder /app/server/package.json /app/server/package.json
COPY --from=builder /app/server/prisma /app/server/prisma

EXPOSE 8000

CMD ["npm", "start"]