FROM node:11.11.0

WORKDIR /opt/app
COPY ./products /opt/app
COPY ./common /opt/common

RUN rm -rf node_modules
RUN npm i

CMD ["node", "index.js"]
