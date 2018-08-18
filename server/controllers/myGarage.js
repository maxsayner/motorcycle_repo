module.exports = {
  getSavedBike: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_models().then(items => res.status(200).send(items));
  },
  postSavedBike: (req, res) => {
    const dbInstance = req.app.get("db");
    if (req.session.user == null) {
      res.sendStatus(401);
    }

    const { id } = req.session.user;
    console.log(req.body);
    const { model_id } = req.body;

    console.log(55555, id, 6666, model_id);
    dbInstance.post_garage([model_id, id]);
  },

  deleteBike: (req, res) => {
    const dbInstance = req.app.get("db");
    console.log(76573857392875, req.params.model_id);

    dbInstance
      .delete_model([req.params.model_id])
      .then(items => res.status(200).send("deleted"));
  }
};
