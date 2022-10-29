const express = require('express');
const Contests = require('../models/contests');

const Router = new express.Router();

Router.post('/contest', async (req, res) => {
    const user = new Contests(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    }catch(e){  
        res.status(400).send()
    }
})

Router.get('/contest/:contestid', async (req,res) => {
    try{
        const constestData = await Contests.findOne({ _id:  req.params.contestid})
                                    .populate({
                                        path : 'question'
                                    });
        res.status(200).send(constestData)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = Router
