module.exports = (params) => {
  var app = params.app;
  var documentType = {
    Single: 0,
    MULTIPLE: 3,
    Distinct: -1,
    Collection: 1,
    Master: 2,
  };
  var mongo = require("../datasource/mongodb.js");
  var ObjectId = require("mongodb").ObjectId;

  var sendResponse = (res, data, err) => {
    res.send(
      JSON.stringify({
        statusCode: -100,
        statusMessage: data,
        errorMessage: err,
        iid: data !== null ? data.insertedId : null,
      })
    );
  };

  app.post("/write", (req, res) => {
    var query = req.body,
      data = query.query,
      keyIdentifier = query.keyIdentifier;
    console.log(req.body);
    mongo.insertDocument(
      query.url,
      query.client,
      query.database,
      data,
      (err, result) => {
        console.log(err, result);
        sendResponse(res, err, result);
      }
    );
  });

  app.post("/read", (req, res) => {
    var query = req.body,
      data = query.query;

    console.log(req.body);
    if (query.docType === documentType.Collection) {
      mongo.findDocuments(
        query.url,
        query.client,
        query.database,
        data,
        (err, result) => {
          sendResponse(res, err, result);
        }
      );
    } else if (query.docType === documentType.Single) {
      mongo.findSingleDocument(
        query.url,
        query.client,
        query.database,
        data,
        (err, result) => {
          sendResponse(res, err, result);
        }
      );
    }
  });

  app.post("/count", async (req, res) => {
    var query = req.body;
    var data = query.query;
    mongo.getCount(
      query.url,
      query.client,
      query.database,
      data,
      (err, result) => {
        sendResponse(res, err, result);
      }
    );
  });

  app.post("/update", (req, res) => {
    var query = req.body,
      data = query.query;
    if (data._id === undefined) {
      sendResponse({
        res,
        err: { error: "Must Pass _id To Update A Document" },
      });
    } else {
      mongo.updateDocument(
        query.url,
        query.client,
        query.database,
        data,
        (err, result) => {
          sendResponse(res, err, result);
        }
      );
    }
  });

  app.post("/remove", (req, res) => {
    var query = req.body,
      data = query.query;
    mongo.removeDocument(
      query.url,
      query.client,
      query.database,
      data,
      (err, result) => {
        sendResponse(res, err, result);
      }
    );
  });

  app.post("/removemany", (req, res) => {
    var query = req.body,
      data = query.query;
    mongo.removeManyDocument(
      query.url,
      query.client,
      query.database,
      data,
      (err, result) => {
        sendResponse(res, err, result);
      }
    );
  });

  app.post("/aggregate", function (req, res) {
    console.log(req.body.query);
    var query = req.body;
    if (query.docType === documentType.Collection) {
      mongo.aggregate(
        query.url,
        query.client,
        query.database,
        query.query,
        function (err, data) {
          sendResponse(res, err, data);
        },
        query.selector
      );
    } else {
      res.send(
        JSON.stringify({
          result: null,
          error: "Invalide call",
        })
      );
    }
  });

  app.post("/sort", function (req, res) {
    var query = req.body;
    if (query.docType === documentType.Collection) {
      mongo.sort(
        query.url,
        query.client,
        query.database,
        query.query,
        query.pageNum,
        function (err, data) {
          sendResponse(res, err, data);
        },
        query.selector
      );
    } else {
      res.send(
        JSON.stringify({
          result: null,
          error: "Invalide call",
        })
      );
    }
  });
};
