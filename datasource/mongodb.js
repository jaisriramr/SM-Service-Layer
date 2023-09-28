var MongoClient = require("mongodb").MongoClient,
  ObjectId = require("mongodb").ObjectId;

module.exports.getCount = function (cnString, tbl, db1, query, callback) {
  "user strict";
  try {
    MongoClient.connect(
      cnString,
      { useUnifiedTopology: true, useNewUrlParser: true },
      function (err, db) {
        if (err) {
          db.close();
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(db1);

          var collection = dbo.collection(tbl);
          collection.count(query, function (err, count) {
            if (!err) {
              callback(count, null);
              db.close();
            } else {
              callback(null, err);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
  }
};

module.exports.aggregate = function (
  cnString,
  tbl,
  db1,
  query,
  callback,
  selector
) {
  "use strict";
  try {
    MongoClient.connect(
      cnString,
      { useUnifiedTopology: true, useNewUrlParser: true },
      function (err, db) {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(db1);

          var collection = dbo.collection(tbl);
          collection
            .aggregate(query, { allowDiskUse: true })
            .toArray(function (err, docs) {
              if (!err) {
                callback(docs, null);
                db.close();
              } else {
                callback(null, err);
                db.close();
              }
            });
        }
      }
    );
  } catch (ex) {
    callback(null, ex);
  }
};

module.exports.insertDocument = (url, cluster, database, data, callback) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.insertOne(data, (err, documentResponse) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(documentResponse, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.insertManyDocument = (
  url,
  cluster,
  database,
  data,
  callback
) => {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.insertMany(data, (err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.updateDocument = (url, cluster, database, data, callback) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var id = new ObjectId(data._id);
          delete data._id;
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.updateOne({ _id: id }, { $set: data }, (err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (er) {
    callback(null, err);
    db.close();
  }
};

module.exports.findSingleDocument = (
  url,
  cluster,
  database,
  data,
  callback
) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.findOne(data, (err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.findDocuments = (url, cluster, database, data, callback) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.find(data).toArray((err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.removeDocument = (url, cluster, database, data, callback) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.deleteOne(data, (err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.removeManyDocument = (
  url,
  cluster,
  database,
  data,
  callback
) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);
          collection.deleteMany(data, (err, result) => {
            if (err) {
              callback(null, err);
              db.close();
            } else {
              callback(result, null);
              db.close();
            }
          });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};

module.exports.sort = (url, cluster, database, data, pageNum, callback) => {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, db) => {
        if (err) {
          callback(null, err);
          db.close();
        } else {
          var dbo = db.db(database);
          var collection = dbo.collection(cluster);

          var itemsPerPage = 10;
          var skip_ = itemsPerPage * (pageNum - 1);

          collection
            .find(data)
            .sort({ _id: 1 })
            .skip(skip_)
            .limit(itemsPerPage)
            .toArray((err, result) => {
              if (err) {
                callback(null, err);
                db.close();
              } else {
                callback(result, null);
                db.close();
              }
            });
        }
      }
    );
  } catch (err) {
    callback(null, err);
    db.close();
  }
};
