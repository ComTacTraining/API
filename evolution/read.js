'use strict';

const dynamodb = require('../dynamodb/client');
//const middy = require('middy');
//const { cors } = require('middy/middlewares');

//const read = (event, context, callback) => {
module.exports.read = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
        id: event.pathParameters.id,
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
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};

/*const handler = middy(read)
  .use(cors());

module.exports.read = handler;*/