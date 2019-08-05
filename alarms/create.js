import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.tableName,
    Item: {
      pk: event.requestContext.identity.cognitoIdentityId,
      sk: 'ALARMS',
      data: event.requestContext.identity.cognitoIdentityId,
      alarm1: data.alarm1,
      alarm2: data.alarm2,
      alarm3: data.alarm3,
      dispatchCenter: data.dispatchCenter,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
