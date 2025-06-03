"use client"
import CheckoutForm from "@/app/components/StripeCheckout"
import { RefObject, useEffect, useState } from "react"

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>
  amount: number
}

const PaymentModal = ({ modalRef, amount }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch("/api/stripePaymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
        }),
      })

      const data = await res.json()
      setClientSecret(data.clientSecret)
    }

    fetchClientSecret()
  }, [])

  console.log(clientSecret)

  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Donate</h3>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            {/* Need to add stripe component and a form field to take  amount input */}
            {clientSecret && <CheckoutForm clientSecret={clientSecret} />}
            <button
              type="button"
              className="btn w-full"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default PaymentModal
