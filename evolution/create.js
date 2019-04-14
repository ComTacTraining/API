'use strict';

const uuid = require('uuid');
const dynamodb = require('../dynamodb/client');
//const middy = require('middy');
//const { cors } = require('middy/middlewares');

//const create = (event, context, callback) => {
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  
  // Repeat check for all attributes
  if (typeof data.category !== 'string' || 
    typeof data.construction !== 'string' ||
    typeof data.street !== 'string' ||
    typeof data.size !== 'string' ||
    typeof data.height !== 'string' ||
    typeof data.occupancyType !== 'string' ||
    typeof data.witnessedConditions !== 'string' ||
    typeof data.entryEgress !== 'string' ||
    typeof data.survivabilityProfile !== 'string' ||
    typeof data.placement !== 'string' ||
    typeof data.side !== 'string' ||
    typeof data.flowpath !== 'string' ||
    typeof data.exhaustPath !== 'string' ||
    typeof data.smokeConditions !== 'string' ||
    typeof data.smokeColor !== 'string' ||
    typeof data.intro !== 'string' ||
    typeof data.approach !== 'string' ||
    typeof data.alpha !== 'string' ||
    typeof data.bravo !== 'string' ||
    typeof data.charlie !== 'string' ||
    typeof data.delta !== 'string') {

    console.error('Validation Failure');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: "String type required"
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      category: data.category,
      construction: data.construction,
      street: data.street,
      size: data.size,
      height: data.height,
      occupancyType: data.occupancyType,
      witnessedConditions: data.witnessedConditions,
      entryEgress: data.entryEgress,
      survivabilityProfile: data.survivabilityProfile,
      placement: data.placement,
      side: data.side,
      flowpath: data.flowpath,
      exhaustPath: data.exhaustPath,
      smokeConditions: data.smokeConditions,
      smokeColor: data.smokeColor,
      intro: data.intro,
      approach: data.approach,
      alpha: data.alpha,
      bravo: data.bravo,
      charlie: data.charlie,
      delta: data.delta,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamodb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to create evolution.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

/*const handler = middy(create)
  .use(cors());

module.exports.create = handler;*/
