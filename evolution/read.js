'use strict';

const dynamodb = require('../dynamodb/client');

module.exports.read = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      pk: event.pathParameters.id,
      sk: 'EVOLUTION',
    }
  };

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to fetch evolution.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
