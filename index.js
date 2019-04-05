const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const COMTAC_DB = process.env.DYNAMODB_TABLE;
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

// Get Evolution endpoint
app.get("/evolutions/:evolutionId", function(req, res) {
  const params = {
    TableName: EVOLUTIONS_TABLE,
    Key: {
      evolutionId: req.params.evolutionId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get evolution" });
    }
    if (result.Item) {
      const {
        evolutionId,
        type,
        construction,
        street,
        size,
        height,
        occupancyType,
        witnessedConditions,
        entryEgress,
        survivabilityProfile,
        location,
        side,
        flowpath,
        exhaustPath,
        smokeConditions,
        smokeColor,
        intro,
        approach,
        alpha,
        bravo,
        charlie,
        delta
      } = result.Item;
      res.json({
        evolutionId,
        type,
        construction,
        street,
        size,
        height,
        occupancyType,
        witnessedConditions,
        entryEgress,
        survivabilityProfile,
        location,
        side,
        flowpath,
        exhaustPath,
        smokeConditions,
        smokeColor,
        intro,
        approach,
        alpha,
        bravo,
        charlie,
        delta
      });
    } else {
      res.status(404).json({ error: "Evolution not found" });
    }
  });
});

// Create Evolution endpoint
app.post("/evolutions", function(req, res) {
  const {
    evolutionId,
    type,
    construction,
    street,
    size,
    height,
    occupancyType,
    witnessedConditions,
    entryEgress,
    survivabilityProfile,
    location,
    side,
    flowpath,
    exhaustPath,
    smokeConditions,
    smokeColor,
    intro,
    approach,
    alpha,
    bravo,
    charlie,
    delta
  } = req.body;
  if (typeof evolutionId !== "string") {
    res.status(400).json({ error: '"evolutionId" must be a string' });
  } else if (typeof type !== "string") {
    res.status(400).json({ error: '"type" must be a string' });
  } else if (typeof construction !== "string") {
    res.status(400).json({ error: '"construction" must be a string' });
  } else if (typeof street !== "string") {
    res.status(400).json({ error: '"street" must be a string' });
  } else if (typeof size !== "string") {
    res.status(400).json({ error: '"size" must be a string' });
  } else if (typeof height !== "string") {
    res.status(400).json({ error: '"height" must be a string' });
  } else if (typeof occupancyType !== "string") {
    res.status(400).json({ error: '"occupancyType" must be a string' });
  } else if (typeof witnessedConditions !== "string") {
    res.status(400).json({ error: '"witnessedConditions" must be a string' });
  } else if (typeof entryEgress !== "string") {
    res.status(400).json({ error: '"entryEgress" must be a string' });
  } else if (typeof survivabilityProfile !== "string") {
    res.status(400).json({ error: '"survivabilityProfile" must be a string' });
  } else if (typeof location !== "string") {
    res.status(400).json({ error: '"location" must be a string' });
  } else if (typeof side !== "string") {
    res.status(400).json({ error: '"side" must be a string' });
  } else if (typeof flowpath !== "string") {
    res.status(400).json({ error: '"flowpath" must be a string' });
  } else if (typeof exhaustPath !== "string") {
    res.status(400).json({ error: '"exhaustPath" must be a string' });
  } else if (typeof smokeConditions !== "string") {
    res.status(400).json({ error: '"smokeConditions" must be a string' });
  } else if (typeof smokeColor !== "string") {
    res.status(400).json({ error: '"smokeColor" must be a string' });
  } else if (typeof intro !== "string") {
    res.status(400).json({ error: '"intro" must be a string' });
  } else if (typeof approach !== "string") {
    res.status(400).json({ error: '"approach" must be a string' });
  } else if (typeof alpha !== "string") {
    res.status(400).json({ error: '"alpha" must be a string' });
  } else if (typeof bravo !== "string") {
    res.status(400).json({ error: '"bravo" must be a string' });
  } else if (typeof charlie !== "string") {
    res.status(400).json({ error: '"charlie" must be a string' });
  } else if (typeof delta !== "string") {
    res.status(400).json({ error: '"delta" must be a string' });
  }

  const params = {
    TableName: EVOLUTIONS_TABLE,
    Item: {
      evolutionId: evolutionId,
      type: type,
      construction: construction,
      street: street,
      size: size,
      height: height,
      occupancyType: occupancyType,
      witnessedConditions: witnessedConditions,
      entryEgress: entryEgress,
      survivabilityProfile: survivabilityProfile,
      location: location,
      side: side,
      flowpath: flowpath,
      exhaustPath: exhaustPath,
      smokeConditions: smokeConditions,
      smokeColor: smokeColor,
      intro: intro,
      approach: approach,
      alpha: alpha,
      bravo: bravo,
      charlie: charlie,
      delta: delta
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create evolution" });
    }
    res.json({
      evolutionId,
      type,
      construction,
      street,
      size,
      height,
      occupancyType,
      witnessedConditions,
      entryEgress,
      survivabilityProfile,
      location,
      side,
      flowpath,
      exhaustPath,
      smokeConditions,
      smokeColor,
      intro: intro,
      approach: approach,
      alpha: alpha,
      bravo: bravo,
      charlie: charlie,
      delta: delta
    });
  });
});

module.exports.handler = serverless(app);
