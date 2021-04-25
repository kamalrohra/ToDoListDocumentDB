const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var today = new Date();
var day = "";
var items = ["food", "clothes", "bla"];
var workitems = ["hw", "ps", "js"];

var MongoClient = require("mongodb").MongoClient,
  f = require("util").format,
  fs = require("fs");
var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];
var workingClient;
var client = MongoClient.connect(
  "mongodb://awsadmin:admin123@docdb-2021-04-25-11-14-26.cekrf1qibe4r.us-east-1.docdb.amazonaws.com/sample-database?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
  {
    useUnifiedTopology: true,
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) throw err;
    workingClient = client;
    //Specify the database to be used
    db = client.db("sample-database");

    //Specify the collection to be used
    col = db.collection("sample-collection");

    //Insert a single document
    col.insertOne({ hello: "Amazon DocumentDB" }, function (err, result) {
      //Find the document that was previously written
      col.findOne({ hello: "Amazon DocumentDB" }, function (err, result) {
        //Print the result to the screen
        console.log(result);

        //Close the connection
        client.close();
      });
    });
  }
);

app.get("/testdb", (req, res) => {
  //Specify the Amazon DocumentDB cert
  //Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set,
  //  and specify the read preference as secondary preferred
});

app.get("/", function (req, res) {
  var options = { weekday: "long", year: "numeric", month: "long" };
  day = today.toLocaleString("en-us", options);
  res.render("list", { myday: day, newListIems: items });
});

app.get("/work", function (req, res) {
  day = "work";
  res.render("list", { myday: day, newListIems: workitems });
});

app.post("/", function (req, res) {
  var item = req.body.NextItem;
  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/todos", (req, res) => {
  var MongoClient = require("mongodb").MongoClient,
    f = require("util").format,
    fs = require("fs");
  var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];
  var client = MongoClient.connect(
    "mongodb://awsadmin:admin123@docdb-2021-04-25-11-14-26.cekrf1qibe4r.us-east-1.docdb.amazonaws.com/sample-database?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
    {
      useUnifiedTopology: true,
      sslValidate: true,
      sslCA: ca,
      useNewUrlParser: true,
    },
    function (err, client) {
      if (err) throw err;
     
      //Specify the database to be used
      db = client.db("sample-database");

      //Specify the collection to be used
      col = db.collection("sample-collection");
    
      // Insert a single document
      col.insertOne({ hello: "there", name: "Edward" }, function (err, result) {
        //Find the document that was previously written
        col.findOne({ hello: "there" }, function (err, result) {
          //Print the result to the screen
          console.log(result);

          //Close the connection
          client.close();
        });
      });
    }
  );
});

//LIST
app.get("/todoslist", (req, res) => {
  var MongoClient = require("mongodb").MongoClient,
    f = require("util").format,
    fs = require("fs");
  var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];
  var client = MongoClient.connect(
    "mongodb://awsadmin:admin123@docdb-2021-04-25-11-14-26.cekrf1qibe4r.us-east-1.docdb.amazonaws.com/sample-database?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
    {
      useUnifiedTopology: true,
      sslValidate: true,
      sslCA: ca,
      useNewUrlParser: true,
    },
    function (err, client) {
      if (err) throw err;
     
      //Specify the database to be used
      db = client.db("sample-database");

      //Specify the collection to be used
      col = db.collection("sample-collection");
    
      // Insert a single document
     col.find({}, function(err, result) {
       console.log(result)
     })

     res.send("Maybe it worked, maybe it didn't")
    }
  );
});

//DELETE
app.get("/todosdelete", (req, res) => {
  var MongoClient = require("mongodb").MongoClient,
    f = require("util").format,
    fs = require("fs");
  var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];
  var client = MongoClient.connect(
    "mongodb://awsadmin:admin123@docdb-2021-04-25-11-14-26.cekrf1qibe4r.us-east-1.docdb.amazonaws.com/sample-database?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
    {
      useUnifiedTopology: true,
      sslValidate: true,
      sslCA: ca,
      useNewUrlParser: true,
    },
    function (err, client) {
      if (err) throw err;
     
      //Specify the database to be used
      db = client.db("sample-database");

      //Specify the collection to be used
      col = db.collection("sample-collection");
    
      // Insert a single document
      col.remove({ hello: "there", name: "Edward" }, function (err, result) {
        //Find the document that was previously written
       console.log(result)
      });
    }
  );
});


app.listen(3000, function () {
  console.log("port running on 3000");
});
