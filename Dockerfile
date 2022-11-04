FROM node:18-alpine

WORKDIR '/app'

ENV MONGO_URL=mongodb+srv://codeforall:codeforall@cluster0.thl3ihl.mongodb.net/test \
    YOUR_KEY_ID=rzp_live_5Ok7Ayky3icNT7 \
    YOUR_KEY_SECRET=maAxGQDFeKKlU8iTZsB2fByY \
    RAZORPAYMERCHANTID=KZTqp4lVNmHJJ6

COPY ./package.json ./

RUN npm install

COPY . . 

CMD ["npm", "run", "start"]

