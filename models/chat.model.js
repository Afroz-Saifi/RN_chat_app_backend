const mongoose=require('mongoose');

const chatSchema=mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Chat=mongoose.model("chat",chatSchema);

module.exports={Chat}