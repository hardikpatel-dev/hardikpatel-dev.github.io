import { NextResponse } from "next/server";

export async function POST(request) {
  const headers = {
    "Access-Control-Allow-Origin": "*", // Temporary for testing, lock to "https://itshardik.vercel.app" later
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    console.log("Processing POST request to /api/send-email");
    const { name, email, organization, service, message } =
      await request.json();

    if (!email || !message) {
      console.log("Validation failed:", { email, message });
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400, headers }
      );
    }

    const { Resend } = await import("resend");
    const { default: ContactEmail } = await import("@/app/emails/ContactEmail");

    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY); // Debug API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Verify this domain in Resend dashboard
      to: "officialhkpatel@gmail.com",
      subject: "Hardik's Portfolio Form Submission",
      react: ContactEmail({ name, email, organization, service, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error in API route:", error.message);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500, headers }
    );
  }
}
