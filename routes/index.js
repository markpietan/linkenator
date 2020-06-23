const apiRouter = require('express').Router();
const linksRouter = require('./links');
const { Router } = require('express');
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});
apiRouter.use("/links", linksRouter)
module.exports = apiRouter;
