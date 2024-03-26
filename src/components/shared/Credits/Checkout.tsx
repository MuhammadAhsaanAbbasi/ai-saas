"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.actions";

import { Button } from "@/components/ui/button";

const Checkout = ({
    _id,
    plan,
    amount,
    credits,
    buyerId,
}: {
    _id: number,
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}) => {
    const { toast } = useToast();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }, []);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast({
                title: "Order placed!",
                description: "You will receive an email confirmation",
                duration: 5000,
                className: "success-toast",
            });
        }

        if (query.get("canceled")) {
            toast({
                title: "Order canceled!",
                description: "Continue to shop around and checkout when you're ready",
                duration: 5000,
                className: "error-toast",
            });
        }
    }, [toast]);

    const onCheckout = async () => {
        const transaction = {
            _id,
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };

    return (
        <form action={onCheckout} method="POST">
            <section>
                <Button
                    type="submit"
                    role="link"
                    className="w-full rounded-full hover:bg-black-gradient bg-cover"
                >
                    Buy Credit
                </Button>
            </section>
        </form>
    );
};

export default Checkout;