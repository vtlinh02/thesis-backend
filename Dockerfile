#This is the build phase
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# This is the run phase
FROM node:20-alpine as runner

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --production=true --frozen-lockfile

EXPOSE 8000

# This command below run when the container start running
CMD ["node", "dist/main"]