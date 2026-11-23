"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Clock3, X } from "lucide-react";
import { CONSULTATION_FEE_NGN } from "../../../lib/consultation";

type PaymentState = "checking" | "paid" | "unpaid" | "error";

export default function PaymentCallbackPage() {
  const [state, setState] = useState<PaymentState>("checking");

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference");
    if (!reference) {
      setState("unpaid");
      return;
    }

    fetch("/api/paystack/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Verification failed");
        setState(result.paid ? "paid" : "unpaid");
      })
      .catch(() => setState("error"));
  }, []);

  const content = {
    checking: { icon: <Clock3 className="size-7 animate-spin" />, title: "Checking your payment", message: "Please wait while we confirm your payment securely with Paystack." },
    paid: { icon: <Check className="size-7" />, title: "Payment confirmed", message: `Paystack confirmed your ₦${CONSULTATION_FEE_NGN.toLocaleString("en-NG")} consultation fee. Contact FeeCare to arrange your appointment; this demo site does not save appointment requests.` },
    unpaid: { icon: <X className="size-7" />, title: "Payment not confirmed", message: "No successful payment was found for this attempt. You have not been charged by this page." },
    error: { icon: <X className="size-7" />, title: "We could not verify yet", message: "Please refresh this page to check again, or contact FeeCare before making another payment." },
  }[state];

  return (
    <main className="grid min-h-screen place-items-center bg-[#F8FAFC] px-5 py-16 text-[#102A43]">
      <section aria-live="polite" className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl sm:p-12">
        <span className={`mx-auto grid size-16 place-items-center rounded-full ${state === "paid" ? "bg-teal-50 text-teal-700" : "bg-blue-50 text-blue-700"}`}>{content.icon}</span>
        <h1 className="mt-6 font-serif text-3xl sm:text-4xl">{content.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{content.message}</p>
        <Link href="/#home" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163A5C]"><ArrowLeft className="size-4" /> Back to FeeCare</Link>
      </section>
    </main>
  );
}
