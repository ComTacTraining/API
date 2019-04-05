const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const EVOLUTIONS_TABLE = process.env.EVOLUTIONS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

app.get("/", function(req, res) {
  res.send("Tactical Command Training");
});

// Get All Evolutions
app.get("/evolutions", function(req, res) {
  const params = {
    TableName: EVOLUTIONS_TABLE
  };
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      req.status(400).json({error: "Could not get evolutions"});
    }
    if (result.Items) {
      res.json(result.Items);
    } else {
      res.status(404).json({error: "Evolutions not found"});
    }
  });
});