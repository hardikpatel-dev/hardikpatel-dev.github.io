import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/app/emails/ContactEmail"; // Adjust path as needed

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, organization, service, message } =
      await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Your verified domain
      to: "officialhkpatel@gmail.com",
      subject: "New Contact Form Submission",
      react: ContactEmail({ name, email, organization, service, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
