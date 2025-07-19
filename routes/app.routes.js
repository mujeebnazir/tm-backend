const { Router } = require('express');
const {    
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markCompleted,
    getTasksByCategory,
    getCategories } = require('../controllers/task.controller.js');
const { generate} = require('../controllers/openai.controller.js');

const appRoutes = Router();

appRoutes.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});
appRoutes.post('/create-task', createTask);
appRoutes.get('/tasks', getTasks);
appRoutes.get('/tasks/:id', getTaskById);
appRoutes.put('/tasks/:id', updateTask);
appRoutes.delete('/tasks/:id', deleteTask);
appRoutes.put('/tasks/:id/complete', markCompleted);
appRoutes.get('/tasks-filter', getTasksByCategory);
appRoutes.get('/categories', getCategories);
appRoutes.post('/generate', generate);


module.exports = appRoutes;