const Player = require("../models/player.model.js");


exports.findLeaderBoardSubject = (req, res) => {
  Player.findBySubject(req.params.subject ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Players with subject ${req.params.subject}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Players with Subject " + req.params.subject
        });
      }
    } else res.send(data);
  });
};


// Retrieve all Players from the database.
exports.findLeaderBoardAll = (req, res) => {
  Player.getAllLeaderBoard((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    else res.send(data);
  });
};


exports.addScore = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Player.AddScoreById(
    req.params.playerId,
    new Player(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Player with id ${req.params.playerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Player with id " + req.params.playerId
          });
        }
      } else res.send(data);
    }
  );
};