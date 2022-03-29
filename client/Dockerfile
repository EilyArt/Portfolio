FROM node:alpine as BUILD_IMAGE
WORKDIR /client
COPY package.json ./
# install dependencies
RUN npm install --frozen-lockfile
COPY . .
# build
RUN npm run build
# remove dev dependencies
RUN npm prune --production
FROM node:alpine
WORKDIR /client
# copy from build image
COPY --from=BUILD_IMAGE /client/package.json ./package.json
COPY --from=BUILD_IMAGE /client/node_modules ./node_modules
COPY --from=BUILD_IMAGE /client/.next ./.next
COPY --from=BUILD_IMAGE /client/public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]