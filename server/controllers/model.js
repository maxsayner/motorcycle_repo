module.exports = {
  post: (req, res) => {
    const dbInstance = req.app.get("db");

    const { model_name, model_id, brand_id, image_url, brand_name } = req.body;

    dbInstance
      .post_models([brand_id, model_id, image_url, model_name, brand_name])
      .then(response => res.send(response))
      .catch(err => console.log("XXXXX ERROR!", err));
  },
  get: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_models().then(items => res.status(200).send(items));
  },
  getModels: (req, res) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    dbInstance
      .get_models_by_brand(id)
      .then(items => res.status(200).send(items));
  },

  getSpecs: (req, res) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    if (id != "null") {
      dbInstance
        .get_specs_by_spec_id([id])
        .then(items => res.status(200).send(items));
    } else {
      res.sendStatus(404);
    }
  },

  postModel: (req, res) => {
    const dbInstance = req.app.get("db");

    const { id } = req.session.user;
    const { model_id } = req.body;

    //insert into your garage_bikes database, and pass in the id and the model_id (id goes in user_id)
  },

  put: (req, res) => {
    const dbInstance = req.app.get("db");
    console.log("req.body", req.body);
    var { model_id } = req.body;

    dbInstance
      .update_product([id, name, descr, price, image])
      .then(() => res.status(200))
      .catch(err => console.warn(err));
  },

  getModelsInGarage: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_items_in_garage([req.params.user_id]).then(garageModels => {
      const modelsToSend = garageModels.map(item => {
        return dbInstance.get_model_by_id([item.model_id]).then(model => {
          return model[0];
        });
      });

      const results = Promise.all(modelsToSend);
      console.log("this is results", results);

      results.then(data => {
        console.log("this is data", data);
        res.send(data);
      });

      // console.log("MODELSTOSEND", modelsToSend);
      // res.send(modelsToSend);
    });
  }
};
