const express = require('express');

const authQueries = require('../queries/auth');
const authRouter = express.Router();

authRouter.get('/signin', authQueries.getUser);
authRouter.post('/signup', authQueries.postUser);

module.exports = authRouter;

