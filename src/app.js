const express = require('express');
const cors = require('cors');
require('./db/mongoose')
const contestRouter = require('./routers/contests');
const questionRouter = require('./routers/questions')
const userRouter = require('./routers/user');

const app = express();
app.use(express.json());
app.use(cors());
app.use(contestRouter);
app.use(questionRouter);
app.use(userRouter);

port = process.env.PORT || 9008;

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})
