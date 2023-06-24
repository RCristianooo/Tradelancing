const mongoose = require('mongoose');

const ProSchema = new mongoose.Schema ({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    proImage: {
        type: String,
        require: true,
    },
    proDescription: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        unique: true,
    },
    bookmarks: {
        type: Array,
        required: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    totalJobs: {
        type: Number,
    },
    completedJobs: {
        type: Number,
    },
    queuedJobs: {
        type: Number,
    },
    yearsOfExp: {
        type: Number,
        required: true,
    },
    paymentMethods: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model("Pro", ProSchema);