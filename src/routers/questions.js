const express = require('express');
const auth = require('../middleware/auth');
const Questions = require('../models/questions');
const Contests = require('../models/contests');

const Router = new express.Router()

Router.post('/questions', auth, async (req,res) => {
    try{
        if(req.body.answer)
            req.body.solution = true;
        const ques = new Questions(req.body);
        const contestId  = req.body.contest;
        const savedQues = await ques.save();
        await Contests.findByIdAndUpdate(contestId,{ 
            $push: { question: savedQues._id } 
        },
        { 
            new: true, useFindAndModify: false 
        },
        );
        res.status(201).send(savedQues)
    }catch(e){  
        console.log(e);
        res.status(400).send(e)
    }
})

Router.put('/questions/:questionId', auth, async (req,res) => {
    try {
        const ques = await Questions.findById(req.params.questionId);
        ques.question = req.body.question;
        ques.save();
        res.status(201).send(ques);
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

Router.put('/questions/solution/:questionId', auth, async (req,res) => {
    const answer = req.body.answer;
    const questionId = req.params.questionId;
    try {
        const savedQues = await Questions.findById(questionId);
        if(answer){
            savedQues.answer = answer;
            savedQues.solution = true;
        }
        const ans = await savedQues.save();
        res.status(201).send(ans)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

Router.get('/questions/:questionId', async (req,res) => {
    try{
        const question = await Questions.findById(req.params.questionId);
        res.status(200).send(question);
    }catch(e){
        res.status(401).send(e)
    }
})

Router.get('/questions/contest/:contestId', async (req,res) => {
    try{
        const contestData = await Questions.find({ contest: req.params.contestId})
        res.status(200).send(contestData)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = Router