import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, description, budget, timeline, referral_source } = body;

    // Validate required fields
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Name, email, phone, and description are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("orders").insert({
      name,
      email,
      phone,
      description,
      budget: budget || null,
      timeline: timeline || null,
      referral_source: referral_source || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit order. Please try again later." },
        { status: 500 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: "Made Wrong Orders <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Order from ${name}`,
      html: `
        <h2>New Commission Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
        ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
        ${referral_source ? `<p><strong>Referral:</strong> ${referral_source}</p>` : ""}
      `,
    }).catch((err) => {
      console.error("Resend email error:", err);
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
