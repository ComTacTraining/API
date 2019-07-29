import AWS from 'aws-sdk';

export function call(action, params) {
  let options = {};
  if (process.env.IS_OFFLINE) {
    options = {
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    };
  }
  const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

  return dynamoDb[action](params).promise();
}
