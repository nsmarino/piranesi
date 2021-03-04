import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async (draftOrder) => {
  const res = await stripe.paymentIntents.create({
    amount: draftOrder.costs.total*100,
    currency: 'usd',
    description: draftOrder.id,
  })

  return res
}