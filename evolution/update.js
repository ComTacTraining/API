'use strict';

const dynamodb = require('../dynamodb/client');

  module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  
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
    typeof data.fireType !== 'string' ||
    typeof data.exhaustPath !== 'string' ||
    typeof data.smoke !== 'string' ||
    typeof data.intro !== 'string' ||
    typeof data.approach !== 'string' ||
    typeof data.alpha !== 'string' ||
    typeof data.bravo !== 'string' ||
    typeof data.charlie !== 'string' ||
    typeof data.delta !== 'string' ||
    typeof data.loop !== 'string') {

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
    Key: {
        pk: event.pathParameters.id,
        sk: 'EVOLUTION'
    },
    ExpressionAttributeNames: {
      '#data': 'data',
      '#loop': 'loop',
    },
    ExpressionAttributeValues: {
        ':data': data.category,
        ':category': data.category,
        ':construction': data.construction,
        ':street': data.street,
        ':size': data.size,
        ':height': data.height,
        ':occupancyType': data.occupancyType,
        ':witnessedConditions': data.witnessedConditions,
        ':entryEgress': data.entryEgress,
        ':survivabilityProfile': data.survivabilityProfile,
        ':placement': data.placement,
        ':side': data.side,
        ':flowpath': data.flowpath,
        ':fireType': data.fireType,
        ':exhaustPath': data.exhaustPath,
        ':smoke': data.smoke,
        ':approach': data.approach,
        ':intro': data.intro,
        ':alpha': data.alpha,
        ':bravo': data.bravo,
        ':charlie': data.charlie,
        ':delta': data.delta,
        ':loop': data.loop,
        ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #data = :data, category = :category, construction = :construction, street = :street, size = :size, height = :height, occupancyType = :occupancyType, witnessedConditions = :witnessedConditions, entryEgress = :entryEgress, survivabilityProfile = :survivabilityProfile, placement = :placement, side = :side, flowpath = :flowpath, firetype = :fireType, exhaustPath = :exhaustPath, smoke = :smoke, approach = :approach, intro = :intro, alpha = :alpha, bravo = :bravo, charlie = :charlie, delta = :delta, #loop = :loop, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  dynamodb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to update evolution.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
