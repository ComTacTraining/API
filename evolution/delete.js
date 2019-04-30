'use strict';

const dynamodb = require('../dynamodb/client');

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
        pk: event.pathParameters.id,
        sk: 'EVOLUTION',
    }
  };

  dynamodb.delete(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to remove evolution.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};

/*const handler = middy(delete)
  .use(cors());

module.exports.delete = handler;*/