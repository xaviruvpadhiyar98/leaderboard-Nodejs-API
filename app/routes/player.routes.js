module.exports = app => {
  const players = require("../controllers/player.controller");
  const leaderBoard = require('../controllers/scoreAdd.controller')

  // Create a new Player
  app.post("/players", players.create);

  // Retrieve all Players
  app.get("/players", players.findAll);

  // Retrieve a single Player with playerId
  app.get("/players/:playerId", players.findOne);

  // Update a Player with playerId
  app.put("/players/:playerId", players.update);

  // Delete a Player with playerId
  app.delete("/players/:playerId", players.delete);

  // Create a new Player
  app.delete("/players", players.deleteAll);

  // Retrieve all leaderBoard with Subject
  app.get("/leaderBoard/:subject", leaderBoard.findLeaderBoardSubject);

  // Retrieve all leaderBoard with Subject
  app.get("/leaderBoard/", leaderBoard.findLeaderBoardAll);

  // Update a Player with playerId
  app.put("/leaderBoard/:playerId", leaderBoard.addScore);


};
