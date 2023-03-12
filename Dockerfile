FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV MONGODB_URI=mongodb+srv://cms:mycms@cms.fsqzq1x.mongodb.net/?retryWrites=true&w=majority
ENV PAYLOAD_SECRET=a971f34be6a6712b31e5696d
ENV PORT=3000
ENV PAYLOAD_PUBLIC_FRONTEND_URL=https://thriving-crumble-e9ff31.netlify.app
ENV PAYLOAD_PUBLIC_BACKEND_URL=${RAILWAY_STATIC_URL}

WORKDIR /home/node/app
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
