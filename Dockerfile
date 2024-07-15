FROM node:18.12.0

WORKDIR /ifgptfront

COPY package*.json /ifgptfront/

RUN npm install

COPY . /ifgptfront/

EXPOSE 3000

CMD [ "npm","start" ]