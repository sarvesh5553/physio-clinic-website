import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TOY4BZMtoVBvOL",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "WVVkZAtUCzg49UkYujVSfmYB",
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const parsedAmount = Number(amount);

    // Backend Safeguard: Strictly reject any amount less than ₹510
    if (isNaN(parsedAmount) || parsedAmount < 510) {
      return NextResponse.json(
        { success: false, message: "Minimum consultation fee is ₹510." },
        { status: 400 }
      );
    }

    // Amount should be passed in paise (e.g., ₹510 = 51000 paise)
    const options = {
      amount: Math.round(parsedAmount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong with the payment setup." },
      { status: 500 }
    );
  }
}