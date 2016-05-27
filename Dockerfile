FROM node:latest

WORKDIR "/home/user"

ADD package.json
RUN ["npm", "i"]

ADD .

EXPOSE 8000