import { NextResponse } from "next/server";
import { CONSULTATION_FEE_NGN } from "../../../../lib/consultation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Paystack is not configured yet." }, { status: 503 });
  }

  let reference: unknown;
  try {
    ({ reference } = await request.json());
  } catch {
    return NextResponse.json({ error: "Payment reference is missing." }, { status: 400 });
  }

  if (typeof reference !== "string" || !/^feecare_[\w-]{20,80}$/.test(reference)) {
    return NextResponse.json({ error: "Payment reference is invalid." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    });
    const result = await response.json();
    const payment = result.data;
    const paid = response.ok
      && result.status
      && payment?.status === "success"
      && payment?.reference === reference
      && payment?.amount === CONSULTATION_FEE_NGN * 100
      && payment?.currency === "NGN";

    return NextResponse.json({ paid: Boolean(paid) });
  } catch (error) {
    console.error("Paystack verification failed", error);
    return NextResponse.json({ error: "Could not verify payment. Please try again." }, { status: 502 });
  }
}
