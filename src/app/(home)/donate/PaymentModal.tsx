"use client"
import CheckoutForm from "@/app/components/StripeCheckout"
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>
  clientSecret: string | null
}

const PaymentModal = ({ modalRef, clientSecret }: Props) => {
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
