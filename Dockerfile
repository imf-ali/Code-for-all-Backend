FROM node:18-alpine

WORKDIR '/app'

ENV MONGO_URL=$MONGO_URL \
    YOUR_KEY_ID=$YOUR_KEY_ID \
    YOUR_KEY_SECRET=$YOUR_KEY_SECRET \
    RAZORPAYMERCHANTID=$RAZORPAYMERCHANTID

COPY ./package.json ./

RUN npm install

COPY . . 

CMD ["npm", "run", "start"]

