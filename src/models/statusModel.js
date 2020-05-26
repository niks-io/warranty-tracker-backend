const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({

    jobNo:{
        type: String,
        required: true
    },
    statusAction:{
        type: String,
        required: true
    },
    statusNote:{
        type: String,
    },
    statusBranch:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Status",StatusSchema);