FROM registry.cn-beijing.aliyuncs.com/basicfu/nginx:1.15.6-alpine
COPY dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
