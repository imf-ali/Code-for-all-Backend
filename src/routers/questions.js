const express = require('express');
const Questions = require('../models/questions');
const Contests = require('../models/contests');

const Router = new express.Router()

Router.post('/questions', async (req,res) => {
    const ques = new Questions(req.body);
    const contestId  = req.body.contest;
    try{
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

Router.get('/questions/:questionId', async (req,res) => {
    try{
        const question = await Questions.findById(req.params.questionId);
        res.status(200).send(question);
    }catch(e){
        res.status(401).send(e)
    }
})

Router.get('/questions/:contestId', async (req,res) => {
    try{
        const constestData = await Questions.find({ contest: req.params.contestId})
        res.status(200).send(constestData)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = Router