import * as dynamoDbLib from '../libs/dynamodb-lib';
import stripePackage from 'stripe';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const stripe = stripePackage(process.env.stripeSecretKey);
  const params = {
    TableName: process.env.tableName,
    Key: {
      pk: event.requestContext.identity.cognitoIdentityId,
      sk: 'BILLING'
    }
  };

  try {
    const dynamoDbResult = await dynamoDbLib.call('get', params);
    if (dynamoDbResult.Item) {
      const subscriptionId = dynamoDbResult.Item.subscriptionId;
      try {
        const stripeResult = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const result = { stripe: stripeResult, ...dynamoDbResult.Item };
        return success(result);
      } catch (e) {
        return failure({
          status: false,
          error: 'Stripe subscription not found.'
        });
      }
    } else {
      return failure({ status: false, error: 'Billing item not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
