module.exports = {
  getUsers: (req, res) => {
    console.log('here', req)
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    console.log('id', id)

    dbInstance.get_users().then(items => res.status(200).send(items));
  }
};
