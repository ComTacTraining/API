import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    IndexName: 'gsi_1',
    KeyConditionExpression: 'sk = :evolution',
    ExpressionAttributeValues: {
      ':evolution': 'EVOLUTION'
    },
    ProjectionExpression: 'pk, category, street'
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
