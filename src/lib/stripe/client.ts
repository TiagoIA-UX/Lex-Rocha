import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY não configurada.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }

  return stripeClient;
}

export function stripeConfigurado(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
