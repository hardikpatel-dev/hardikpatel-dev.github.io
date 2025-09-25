import { NextResponse } from "next/server";

// No static import of Resend to avoid build-time issues
export async function POST(request) {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin":
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000" // For local development
        : "https://itshardik.vercel.app", // For production
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

    // Dynamically import Resend and ContactEmail
    const { Resend } = await import("resend");
    const { default: ContactEmail } = await import("@/app/emails/ContactEmail");

    // Initialize Resend with the API key at runtime
    const resend = new Resend(process.env.RESEND_API_KEY);

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
