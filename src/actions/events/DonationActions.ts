"use server"

import Donation from "@/db/DonationSchema"
import dbConnect from "@/lib/dbConnect"

interface TransactionInfo {
  userEmail: string | undefined
  userID: string | undefined
  amount: number | undefined
  eventID: string | undefined
}

export const saveTransaction = async ({
  userEmail,
  userID,
  amount,
  eventID,
}: TransactionInfo) => {
  if (!userEmail || !userID || !amount || eventID) {
    return { success: false, message: "No Data Received" }
  }

  await dbConnect()

  const payload = {
    userEmail,
    userID,
    amount,
    eventID,
  }

  const result = await Donation.create(payload)

  if (!result) {
    return { success: false, message: "Failed To Save Transaction" }
  }

  return { success: true, message: "Transaction Successful" }
}
