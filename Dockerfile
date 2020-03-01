FROM node
MAINTAINER jeff
RUN mkdir -p /app/deploy

WORKDIR /app/deploy

COPY . .

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm install -g serve
EXPOSE 5000
CMD ["serve","-s","/app/deploy/build"]
