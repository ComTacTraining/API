'use strict';

const dynamodb = require('../dynamodb/client');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'gsi_1',
    KeyConditionExpression: 'sk = :evolution',
    ExpressionAttributeValues: {
      ':evolution': 'EVOLUTION',
    },
    /*ExpressionAttributeNames: {
      '#data': 'data',
    },*/
    ProjectionExpression: 'pk, category, street'
  };

  dynamodb.query(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to fetch evolutions.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
