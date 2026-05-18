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

module.exports = app;