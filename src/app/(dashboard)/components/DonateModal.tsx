"use client"
import { Dispatch, FormEvent, RefObject, SetStateAction, useState } from "react"

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  openPaymentModal: (amount: number) => void
}

const DonateModal = ({
  modalRef,
  amount,
  setAmount,
  openPaymentModal,
}: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}
  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Donate</h3>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <form onSubmit={handleSubmit}>
              <label htmlFor="amount">Enter Amount (Min: 15$)</label>
              <input
                type="number"
                name="amount"
                className="input input-bordered w-full mb-2"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={15}
              />
              <button
                type="submit"
                className="btn bg-emerald-600 w-full text-white"
              >
                Proceed To Payment
              </button>
            </form>
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
export default DonateModal
