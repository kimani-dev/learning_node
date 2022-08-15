const express = require("express");
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 5000;

// initialize app
const app = express();

// connection to mongo db
const uri =
  "mongodb+srv://ithewakimani:ithewakimani@nodetut.j3bbfqj.mongodb.net/?retryWrites=true&w=majority";

//   mongo db client
const client = new MongoClient(uri);
async function main() {
  try {
    await client
      .connect()
      .then(() => {
        app.listen(3000, { useUnifiedTopology: true, useNewUrlParser: true}, () => {
          console.log("listening on port 3000");
        });
      })
      .catch((e) => {
        console.log(`error is ${e}`);
      });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// cursor
const collection = client
  .db("sample_airbnb")
  .collection("listingsAndReviews")
  .find({})
  .limit(10);

let appartments = [];

// function to get documents
async function getDocuments() {
  try {
    await collection.forEach((doc) => {
      appartments.push(doc);
    });
  } catch (e) {
    console.log(e);
  }
}

getDocuments();
main().catch(console.error);

//register view engine
app.set("view engine", "ejs");

// set static files
app.use(express.static("public"));

app.get("/appartments", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(appartments);
});

app.get("/", (_, res) => {
  res.render("index", { appartments, title: "Title" });
});
// app.get("/about", (_, res) => {
//   res.render("about");
// });
// app.get("/blog/create", (_, res) => {
//   res.render("create");
// });
// app.get("/*", (_, res) => {
//   res.render("404");
// });
