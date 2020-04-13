const express = require('express');

const todoRouter = express.Router();
const todoQueries = require('../queries/todoQueries');

todoRouter.post('/createTodo', todoQueries.postTodo);
todoRouter.get('/getTodos', todoQueries.getTodos);
todoRouter.get('/getTodo/:id', todoQueries.getTodo);
todoRouter.put('/updateTodo', todoQueries.updateTodo);
todoRouter.delete('/deleteTodo', todoQueries.deleteTodo);

module.exports = todoRouter;
