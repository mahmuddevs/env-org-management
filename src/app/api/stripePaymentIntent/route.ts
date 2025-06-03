import { stripe } from "@/lib/stripe/stripe"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { amount } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
