module.exports = {
  getSavedBike: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_models().then(items => res.status(200).send(items));
  },
  postSavedBike: (req, res) => {
    const dbInstance = req.app.post("db");
    const { id } = req.session.user.id;
    const { model_id } = req.body;

    console.log(55555, id, 6666, model_id);
  }
};
