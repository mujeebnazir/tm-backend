const Task = require('../models/task.model.js');

const createTask = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        if (!title || !description || !category) {
            return res.status(400).json({ error: 'Title, description, and category are required' });
        }
        const task = await Task.create({ title, description, category, priority });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const { category, priority, search} = req.query;

        const query = {};
        if(category){
            query.category = {$regex:category, $options: 'i'};
        }
        if(priority){
            query.priority = {$regex:priority, $options: 'i'};
        }
          if (search) {
            query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const markCompleted = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTasksByCategory = async (req, res) => {
    try {
        const { category, priority} = req.query;

        const query = {};
        if(category){
            query.category = {$regex:category, $options: 'i'};
        }
        if(priority){
            query.priority = {$regex:category, $options: 'i'};
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this category' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = ['Work', 'Personal', 'Shopping', 'Other'];
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markCompleted,
    getTasksByCategory,
    getCategories 
};