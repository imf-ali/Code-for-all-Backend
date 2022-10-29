const express = require('express');
require('./db/mongoose')
const contestRouter = require('./routers/contests');
const questionRouter = require('./routers/questions')

const app = express();
app.use(express.json());
app.use(contestRouter);
app.use(questionRouter);

port = process.env.PORT || 9008;

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})
