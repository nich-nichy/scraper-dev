"use client"
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CapturePayment } from "@/actions/billing/capturePayment";
import { toast } from "sonner";
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {};

const PaymentSuccessPage = () => {
    const [countdown, setCountdown] = useState(5);
    const searchParams = useSearchParams();
    const payerId = searchParams.get("PayerID");
    const token = searchParams.get("token");
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: () => CapturePayment(payerId, token),
        onSuccess: () => {
            toast.success("Billing is successful", { id: "Purchase_credits" });
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push("/billing");
                    }
                    return prev - 1;
                });
            }, 1000);
        },
        onError: (error) => {
            toast.error("Billing is not successful", { id: "Purchase_credits" });
        },
    });

    useEffect(() => {
        if (payerId && token) {
            mutation.mutate();
        } else {
            toast.error("Missing PayerID or token");
        }
    }, [payerId, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    Payment Successful! 🎉
                </h1>
                <p className="text-gray-700 mb-4">
                    Thank you for your purchase. <br /> We’re processing your order.
                    <br /> You’ll be redirected to your dashboard shortly.
                </p>
                <div className="flex items-center justify-center mb-6">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-sm text-gray-500">
                    Redirecting in <span className="font-bold">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;

