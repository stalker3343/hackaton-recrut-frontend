FROM node:16.9

WORKDIR /app
COPY . .

RUN npm i --force
RUN npm run build

ENV PORT 3000
ENV HOST 0.0.0.0

EXPOSE 3000
CMD ["npm", "start"]
