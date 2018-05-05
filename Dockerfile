# base image
FROM node:9.11.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache packages
COPY package.json /usr/src/app/
RUN npm install

# start app
CMD ["npm", "start"]