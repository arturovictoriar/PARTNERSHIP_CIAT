### STAGE 1: Build ###
FROM node:10-slim AS build
# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node ./frontend/package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node ./frontend .

RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /home/node/app/dist/partnership-ciat /usr/share/nginx/html
