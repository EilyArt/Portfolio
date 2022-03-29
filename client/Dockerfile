FROM node:latest

WORKDIR /client

COPY package.json package-lock.json ./

RUN npm install 

RUN npm install react@latest react-scripts@latest react-dom@latest -g 

RUN npm install next@12 -g 

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]