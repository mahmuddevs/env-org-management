"use client"
import { FormEvent, RefObject } from "react"

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>
  openPaymentModal: (amount: number) => void
  formRef: RefObject<HTMLFormElement | null>
}

const DonateModal = ({ modalRef, openPaymentModal, formRef }: Props) => {
  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const inputAmount = Number(formData.get("amount"))
    if (inputAmount < 15) {
      return
    }
    openPaymentModal(inputAmount)
  }

  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Donate</h3>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <form ref={formRef} onSubmit={handleInput}>
              <label htmlFor="amount">Enter Amount (Min: 15$)</label>
              <input
                type="number"
                name="amount"
                className="input input-bordered w-full mb-2"
                placeholder="Enter amount"
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
              onClick={() => {
                formRef.current?.reset()
                modalRef.current?.close()
              }}
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
