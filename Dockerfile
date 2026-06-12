FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json proxy.mjs ./

EXPOSE 50209

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider http://127.0.0.1:50209/health || exit 1

CMD ["npm", "start"]
