FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY proxy.mjs ./

EXPOSE 50209

CMD ["npm", "start"]
