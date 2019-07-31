import stripePackage from 'stripe';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const { source, name, email } = JSON.parse(event.body);
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const result = await stripe.customers.create({
      source,
      name,
      email
    });
    return success(result);
    /*if (result.data) {
      return success(result);
    } else {
      return failure({ status: false, error: 'Plans not found.' });
    }*/
  } catch (e) {
    return failure({ message: e.message });
  }
}
