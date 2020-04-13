const express = require('express');

const todoItemRouter = express.Router();
const todoItemQueries = require('../queries/todoItemQueries');


todoItemRouter.post('/createItem', todoItemQueries.postTodoItem );
todoItemRouter.get('/getItems', todoItemQueries.getTodoItem);
todoItemRouter.put('/updateItem', todoItemQueries.updateTodoItem);
todoItemRouter.delete('/deleteItem', todoItemQueries.deleteTodoItem);


module.exports = todoItemRouter;
