#引用镜像
FROM node
#作者
MAINTAINER mkq
#执行命令，创建文件夹
RUN mkdir -p /app/deploy

#将dist目录拷贝到镜像里
COPY ./build /app/deploy

#指定工作目录
WORKDIR /app/deploy


#安装依赖及构建node应用
RUN npm install -g serve
#配置环境变量
# ENV HOST 0.0.0.0
# ENV PORT 3000
#定义程序默认端口
EXPOSE 5000
#运行程序命令
CMD ["serve","-s","/app/deploy"]
