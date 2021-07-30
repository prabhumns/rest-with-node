const express = require('express');

const rootRouter = express.Router();

rootRouter.route('')
  .get((req, res) => {
    // const response = {
    //   text: 'Welcome to my API',
    // };

    // res.json(response);
    res.send('Hello! How are you');
  });

module.exports = rootRouter;
