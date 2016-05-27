FROM node:latest

WORKDIR "/home/user"

ADD package.json "/home/user/package.json"
RUN ["npm", "i", "-g", "mocha"]
RUN ["npm", "i"]

ADD . "/home/user"

EXPOSE 8000
