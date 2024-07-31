import express from "express";
const GameRouter = express.Router();

// model

// another

// routes
GameRouter.get("/", (req, res) => {
  res.render("game/game");
});

export default GameRouter;
