const mongoose = require('mongoose')

const contestsSchema = new mongoose.Schema({
    organiser: {
        type: String,
        required: true
    },
    contestname:{
        type: String,
        required: true,
    },
    dateofcontest: {
        type: String,
        required: true,
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    }]
},{
    timestamps: true
})

const Contests = mongoose.model('Contests',contestsSchema)

module.exports = Contests