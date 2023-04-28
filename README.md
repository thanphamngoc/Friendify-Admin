# WebAdmin Friendify GPT

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

## Install
- [ ]  Ubuntu 20.04.6 LTS (GNU/Linux 5.15.0-1028-aws x86_64)
- [ ]  Nginx
- [ ]  Nodejs >=v16.19.1
- [ ]  Npm >=8.19.3 or Yarn >=1.22.19
- [ ]  pm2 >=5.3.0
- [ ]  Certbot

## How to start
1. Clone source code
   git clone https://github.com/thanphamngoc/Friendify-Admin.git
2. Install dependencies
   ``` npm install ``` or ``` yarn```
3. ``` cp env.example .env``` and change data .env file
4. Start code:
- Dev:

    + ```yarn start``` to start source
- Production:

    + ```yarn build``` to start source

## Setup nginx
1. cd /etc/nginx/conf.d
2. sudo touch friendify-admin.conf
3. sudo vi friendify-admin.conf
4. Paste this code:
```server {
    listen         80;
    listen         [::]:80;
    server_name    admin-pgx.voicegpt.us www.admin-pgx.voicegpt.us;
    return         301 https://$server_name$request_uri;
}
server {
    listen       443 ssl http2;
    listen       [::]:443 ssl http2;
    server_name  admin-pgx.voicegpt.us www.admim-pgx.voicegpt.us;

    ssl_certificate "/etc/letsencrypt/live/admin.friendify.ai/fullchain.pem";
    ssl_certificate_key "/etc/letsencrypt/live/admin.friendify.ai/privkey.pem";
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    client_max_body_size 12M;

    location / {
        add_header Access-Control-Allow-Origin *;
        alias /home/ubuntu/Friendify-Admin/nginx_build/;
        allow all;
        try_files $uri.html $uri $uri/ /index.html;
    }
}


````
5. Save file
6. Run ```sudo nginx -t``` to check syntax
6. Run ```sudo service nginx restart``` to restart nginx service
