import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.tableName,
    Key: {
      pk: event.requestContext.identity.cognitoIdentityId,
      sk: 'ALARMS'
    },
    UpdateExpression:
      'SET alarm1 = :alarm1, alarm2 = :alarm2, alarm3 = :alarm3, dispatchCenter = :dispatchCenter, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':alarm1': data.alarm1 || null,
      ':alarm2': data.alarm2 || null,
      ':alarm3': data.alarm3 || null,
      ':dispatchCenter': data.dispatchCenter || null,
      ':updatedAt': timestamp
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
