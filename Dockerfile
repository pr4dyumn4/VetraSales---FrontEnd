FROM node:20-alpine

WORKDIR /sales-savvy-fe

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev", "--", "--host"]
