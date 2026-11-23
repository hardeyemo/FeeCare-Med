import { NextResponse } from "next/server";
import { CONSULTATION_FEE_NGN } from "../../../../lib/consultation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Paystack is not configured yet." }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Review the appointment details and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Review the appointment details and try again." }, { status: 400 });
  }

  const { name, email, phone, service, doctor, date, time } = payload as Record<string, unknown>;
  const isShortText = (value: unknown, max: number) => typeof value === "string" && value.trim().length > 0 && value.length <= max;
  if (!isShortText(name, 100) || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isShortText(phone, 40) || !isShortText(service, 100) || !isShortText(doctor, 100) || (date !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) || !isShortText(time, 40)) {
    return NextResponse.json({ error: "Review the appointment details and try again." }, { status: 400 });
  }

  const origin = process.env.SITE_URL || new URL(request.url).origin;
  const reference = `feecare_${crypto.randomUUID()}`;

  try {
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: String(CONSULTATION_FEE_NGN * 100),
        currency: "NGN",
        reference,
        callback_url: `${origin}/payment/callback`,
        metadata: {
          service: "FeeCare consultation",
          patient_name: name,
          phone,
          appointment_service: service,
          preferred_doctor: doctor,
          preferred_date: date || "Not specified",
          preferred_time: time,
        },
      }),
      cache: "no-store",
    });
    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status || !result.data?.authorization_url) {
      console.error("Paystack initialization failed", result.message);
      return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ authorizationUrl: result.data.authorization_url });
  } catch (error) {
    console.error("Paystack request failed", error);
    return NextResponse.json({ error: "Payment service is temporarily unavailable." }, { status: 502 });
  }
}
