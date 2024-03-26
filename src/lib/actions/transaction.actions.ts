"use server"

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";
import { handleError } from "../utils";

export async function checkoutCredits(transaction:CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const amount = Number(transaction.amount) * 100
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: transaction.plan,
                    },

                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        metadata: {
            plan: transaction.plan,
            buyerId: transaction.buyerId,
            credits: transaction.credits,
        }
    })
    redirect(session.url!)
}

export async function createTransaction(transaction:CreateTransactionParams) {
    try {
        await connectToDatabase()

        const newTransaction = await Transaction.create({...transaction,
        buyer: transaction.buyerId})

        await updateCredits(transaction.buyerId, transaction.credits)
        return JSON.parse(JSON.stringify(newTransaction))
    } catch (error) {
        handleError(error)
    }
}