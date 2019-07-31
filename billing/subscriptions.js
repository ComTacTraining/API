import * as dynamoDbLib from '../libs/dynamodb-lib';
import stripePackage from 'stripe';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const { customerId, planId } = JSON.parse(event.body);
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const result = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: planId
        }
      ]
    });
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.tableName,
      Item: {
        pk: event.requestContext.identity.cognitoIdentityId,
        sk: 'BILLING',
        data: result.id,
        customerId: customerId,
        planId: planId,
        subscriptionId: result.id,
        canceled: false,
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
  } catch (e) {
    return failure({ message: e.message });
  }
}
