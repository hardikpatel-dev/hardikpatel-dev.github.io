import { NextResponse } from "next/server";

export async function POST(request) {
  const headers = {
    "Access-Control-Allow-Origin": "https://itshardik.vercel.app", // Specific origin for security
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    console.log(
      "Processing POST request to /api/send-email at",
      new Date().toISOString()
    );
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

    console.log(
      "RESEND_API_KEY:",
      process.env.RESEND_API_KEY ? "Set" : "Not set"
    ); // Debug API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in production environment");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const isTest =
      process.env.NODE_ENV === "development" ||
      process.env.TEST_MODE === "true";
    const { data, error } = await resend.emails.send({
      from: isTest ? "onboarding@resend.dev" : "contact@yourdomain.com", // Default verified email agar domain aajaye
      to: "officialhkpatel@gmail.com",
      subject: "Hardik's Portfolio Form Submission",
      react: ContactEmail({ name, email, organization, service, message }),
    });

    if (error) {
      console.error("Resend error:", error.message, error);
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
    console.error("Error in API route:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500, headers }
    );
  }
}
