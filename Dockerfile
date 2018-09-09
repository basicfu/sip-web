FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
RUN echo -e \
"user nginx; \n \
worker_processes auto; \n \
error_log /var/log/nginx/error.log; \n \
pid /var/run/nginx.pid; \n \
events { \n \
    worker_connections 1024; \n \
} \n \
http { \n \
    include             /etc/nginx/mime.types; \n \
    default_type        application/octet-stream; \n \
    log_format  main  '\$remote_addr - \$remote_user [\$time_local] \$request ' \n \
                      '\$status \$body_bytes_sent \$http_referer ' \n \
                      '\$http_user_agent \$http_x_forwarded_for'; \n \
    access_log          /var/log/nginx/access.log  main; \n \
    gzip on; \n \
    gzip_min_length 1k; \n \
    gzip_buffers 4 16k; \n \
    gzip_http_version 1.1; \n \
    gzip_comp_level 6; \n \
    gzip_types text/plain text/css application/font-woff text/javascript application/xml application/x-javascript application/javascript application/json image/jpeg image/gif image/png; \n \
    gzip_vary on; \n \
    gzip_disable 'MSIE [1-6].'; \n \
    sendfile            on; \n \
    tcp_nopush          on; \n \
    tcp_nodelay         on; \n \
    client_max_body_size  20m; \n \
    keepalive_timeout   65; \n \
    types_hash_max_size 2048; \n \
    server { \n \
        listen        80; \n \
        server_name   localhost; \n \
        location / { \n \
          root /usr/share/nginx/html; \n \
          try_files \$uri \$uri/ /index.html; \n \
        } \n \
        location /api/ { \n \
            proxy_pass http://\${API_HOST}/; \n \
            proxy_redirect off; \n \
            proxy_set_header X-Real-IP \$remote_addr; \n \
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; \n \
        } \n \
    } \n \
}" > /etc/nginx/mysite.template
CMD envsubst '$API_HOST' < /etc/nginx/mysite.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
