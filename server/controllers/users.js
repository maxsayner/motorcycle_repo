module.exports = {
  getUsers: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_users().then(items => res.status(200).send(items));
  }
};
