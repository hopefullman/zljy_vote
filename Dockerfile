FROM node

RUN mkdir -p /app/deploy

WORKDIR /app/deploy

COPY . .

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install -g serve && npm install && npm run build

EXPOSE 5000

CMD ["serve","-s","/app/deploy/build"]
