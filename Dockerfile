FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

CMD ["ls", "-la"]


ENTRYPOINT [ "node", "dist/index.js"]