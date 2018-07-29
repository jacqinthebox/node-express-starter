FROM mhart/alpine-node:6.3.0

MAINTAINER Jacqueline

COPY  . /var/www
WORKDIR /var/www
VOLUME ["/var/www"]
RUN npm install

# Expose port 3000 from the container to the host
EXPOSE 3000

ENTRYPOINT ["node","main.js"]
