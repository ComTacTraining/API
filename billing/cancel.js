import * as dynamoDbLib from '../libs/dynamodb-lib';
import stripePackage from 'stripe';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const { subscriptionId } = JSON.parse(event.body);
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.subscriptions.del(subscriptionId);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.tableName,
      Key: {
        pk: event.requestContext.identity.cognitoIdentityId,
        sk: 'BILLING'
      },
      UpdateExpression: 'SET canceled = :canceled, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':canceled': true,
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
  } catch (e) {
    return failure({ message: e.message });
  }
}
