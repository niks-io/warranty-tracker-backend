const mongoose = require('mongoose');

const actionSchema = {

    actionCode:{
        type: String,
        required: true,
        trim: true
    },
    actionType:{
        type: String,
        default: "branch",
        enum: ["branch", "other"]
    },
    actionName:{
        type: String,
        required: true
    },
    branchName:{
        type: String
    }
};

module.exports = mongoose.model("Action", actionSchema);