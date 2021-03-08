import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async (draftOrder:iDraftOrder) => {
  const res = await stripe.paymentIntents.create({
    amount: draftOrder.amount,
    currency: 'usd',
    description: draftOrder.description,
  })

  return res
}