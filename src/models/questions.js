const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    solution: {
        type: Boolean,
        required: true,
        default: false
    },
    answer: {
        type: String,
        required: false,
    },
    contest:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Contests'
    }
},{
    timestamps: true
})

const Questions = mongoose.model('Questions',questionsSchema)

module.exports = Questions