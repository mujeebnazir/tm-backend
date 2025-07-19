const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high']
    },
    description: {

        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    completed: {
        type: Boolean,
        default: false
    },
    category:{
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Other'],
        required: true
    }
},{
    timestamps:true
});

taskSchema.index({ category: 1});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;