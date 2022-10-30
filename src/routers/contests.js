const express = require('express');
const auth = require('../middleware/auth');
const Contests = require('../models/contests');

const Router = new express.Router();

Router.post('/contest', auth, async (req, res) => {
    const user = new Contests(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    }catch(e){  
        res.status(400).send()
    }
})

Router.get('/contest', async (req,res) => {
    try{
        const constests = await Contests.find()
                                .sort({ createdAt: -1})
        res.status(200).send(constests)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
    }
})

Router.get('/contest/organiser/:organisername', async (req,res) => {
    try{
        const constests = await Contests.find({organiser: req.params.organisername})
                                .sort({ createdAt: -1})
        res.status(200).send(constests)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = Router
