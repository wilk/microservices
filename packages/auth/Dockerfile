FROM node:11.11.0

WORKDIR /opt/app
COPY ./ /opt/app

RUN rm -rf node_modules
RUN yarn

CMD ["node", "index.js"]
