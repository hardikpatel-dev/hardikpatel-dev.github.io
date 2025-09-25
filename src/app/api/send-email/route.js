import { NextResponse } from "next/server";
import { Resend } from "resend";

// Use environment variable for security (add to .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "https://itshardik.vercel.app", // Replace with your frontend origin
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    const { name, email, organization, service, message } =
      await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400, headers }
      );
    }

    // Dynamic import to avoid build-time issues
    const { default: ContactEmail } = await import(
      "@/app/emails/ContactEmail"
    );

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Your verified domain
      to: "officialhkpatel@gmail.com",
      subject: "New Contact Form Submission",
      react: ContactEmail({ name, email, organization, service, message }),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500, headers }
    );
  }
}
