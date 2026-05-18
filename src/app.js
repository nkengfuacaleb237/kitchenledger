const express = require('express');
const recipeRouter = require('./routes/recipe.routes');

const app = express();

app.use(express.json());

app.use('/recipes', recipeRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.method} ${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status: status,
    message: err.message || 'Something went wrong on the server',
  });
});

module.exports = app;