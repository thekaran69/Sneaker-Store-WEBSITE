# Use Nginx to serve static content
FROM nginx:alpine

# Copy all  website files into nginx’s default public folder
COPY . /usr/share/nginx/html

EXPOSE 80