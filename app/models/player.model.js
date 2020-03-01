const sql = require("./db.js");

// constructor
const Player = function(player){
  this.name = player.name;
  this.subject = player.subject;
  this.score = player.score;
  this.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
};

Player.create = (newPlayer, result) => {
  sql.query("INSERT INTO leaderDummy SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.findById = (playerId, result) => {
  sql.query(`SELECT * FROM leaderDummy WHERE id = ${playerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Player.getAll = result => {
  sql.query("SELECT * FROM leaderDummy", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

Player.updateById = (id, player, result) => {
  sql.query(
    "UPDATE leaderDummy SET score = ? WHERE id = ?",
    [player.score, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated player: ", { id: id, ...player });
      result(null, { id: id, ...player });
    }
  );
};

Player.remove = (id, result) => {
  sql.query("DELETE FROM leaderDummy WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Player with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted player with id: ", id);
    result(null, res);
  });
};

Player.removeAll = result => {
  sql.query("DELETE FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} players`);
    result(null, res);
  });
};


Player.findBySubject = (playerSubject, result) => {
  sql.query('select  @rank:=@rank + 1 as rank, name , score from leaderDummy,(select @rank:=0) as r where subject =  ? order by score desc, time',[playerSubject], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res);
      result(null, res);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Player.getAllLeaderBoard = result => {
  sql.query("select  @rank:=@rank + 1 as rank, name , score from leaderDummy,(select @rank:=0) as r order by score desc, time", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

Player.AddScoreById = (id, player, result) => {
  sql.query(
    "select * from leaderDummy where id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("selected player: ", { id: id, ...player });
      var row = JSON.parse(JSON.stringify(res))
      console.log(row[0].score , player.score)
      player.score = row[0].score + player.score
      sql.query('UPDATE leaderDummy SET score = ? WHERE id = ?',
        [player.score , id ],
         (err, res)=> {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            // not found Player with the id
            result({ kind: "not_found" }, null);
            return;
          }

      result(null, { id: id, ...player });

    }
  );
});
}


module.exports = Player;
