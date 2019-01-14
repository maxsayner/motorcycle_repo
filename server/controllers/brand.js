module.exports = {
  get: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.get_motorcycles().then(items => res.status(200).send(items));
  },

  post: (req, res) => {
    const dbInstance = req.app.get("db");
    console.log("this is req.body", req.body);

    dbInstance
      .post_motorcycle([req.body.BrandId, req.body.BrandName])
      // .then(response => res.send(response))
      .then(response => console.log("RESPONSE !!!!!", res))

      .catch(err => console.log("XX ERROR", err));

  }
};


