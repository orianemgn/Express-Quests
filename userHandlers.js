const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the users database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
        res.status(200);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the users database");
    });
};

module.exports = {
  getUsers,
  getUserById,
};
