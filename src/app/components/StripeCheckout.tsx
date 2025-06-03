"use client"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { FormEvent, useState } from "react"
import Swal from "sweetalert2"

// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message)
      } else {
        setMessage("An unexpected error occurred.")
      }

      setIsLoading(false)
      return
    }
    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button
        className="btn bg-emerald-600 w-full text-white"
        disabled={!!isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string
}) {
  const appearance = {
    theme: "stripe",
  } as Appearance | undefined

  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{ appearance, clientSecret }}
    >
      <PaymentForm />
    </Elements>
  )
}
