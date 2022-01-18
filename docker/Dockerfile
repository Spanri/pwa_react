# pull official base image
FROM node:14-alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package*.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000 44363

# start app
CMD ["npm", "run", "install-and-start"]