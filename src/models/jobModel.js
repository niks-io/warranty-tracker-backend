const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobNo: {
        type: String,
        required: true,
        trim: true
    },
    jobName: {
        type: String
    },
    jobType: {
        type: String,
        required: true,
        enum: ["warranty", "repair", "service"]
    },
    jobWarrenty: {
        type: Boolean,
        default: false
    },
    jobSNo:{
        type: String
    },
    jobDescription: {
        type: String
    },
    jobDestination: {
        type: String
    },
    jobCustomer: {
        type: String
    },
    jobContact: {
        type: String
    },
    jobBranch: {
        type: String,
        required: true
    },
    jobOfficer: {
        type: String,
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model("Job",JobSchema);