import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
