import stripePackage from 'stripe';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const result = await stripe.products.list({});
    if (result.data) {
      return success(result.data);
    } else {
      return failure({ status: false, error: 'Products not found.' });
    }
  } catch (e) {
    return failure({ message: e.message });
  }
}
