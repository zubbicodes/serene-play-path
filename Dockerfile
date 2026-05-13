FROM node:22-bookworm-slim AS base

WORKDIR /app
ENV NODE_ENV=production
ENV WRANGLER_SEND_METRICS=false

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --include=dev

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
