const express = require('express')
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const todoItemRoutes = require('./routes/todoItemRoutes');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use('/auth', authRoutes);
app.use('/list', todoRoutes);
app.use('/item', todoItemRoutes);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}...`);
});

