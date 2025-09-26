import {
  Html,
  Head,
  Preview,
  Container,
  Section,
  Hr,
  Text,
  Button,
  Link,
  Img,
} from "@react-email/components";

export default function ContactEmail({
  name,
  email,
  organization,
  service,
  message,
}) {
  const previewText = `New Contact Form Submission from ${name || "Anonymous"}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            margin: "2.5rem auto",
            maxWidth: "48rem",
            borderRadius: "0.5rem",
            backgroundColor: "#ffffff",
            padding: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <Section style={{ marginBottom: "1.5rem", textAlign: "start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Img
                src="https://itshardik.vercel.app/assets/hardik.webp"
                width="48"
                height="48"
                style={{
                  borderRadius: "0.75rem",
                  backgroundColor: "#000000",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.025em",
                    textTransform: "uppercase",
                    fontWeight: "800",
                    color: "#1f2937",
                  }}
                >
                  Hardik Patel
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    color: "#6b7280",
                  }}
                >
                  <b style={{ textTransform: "uppercase", color: "#6b7280" }}>
                    Frontend Developer
                  </b>
                </span>
              </div>
            </div>
            <h1
              style={{
                marginTop: "1rem",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
              }}
            >
              New Contact Inquiry
            </h1>
          </Section>
          <Hr
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              borderColor: "#d1d5db",
              border: "none",
              borderTop: "1px solid #eaeaea",
            }}
          />
          <Section>
            <Text
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "16px",
              }}
            >
              Details
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              <strong>Name:</strong> {name || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              <strong>Email:</strong> {email}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              <strong>Organization:</strong> {organization || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              <strong>Services Interested In:</strong>{" "}
              {service || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              <strong>Message:</strong> {message}
            </Text>
          </Section>
          <Hr
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              borderColor: "#d1d5db",
              border: "none",
              borderTop: "1px solid #eaeaea",
            }}
          />
          <Section style={{ textAlign: "center" }}>
            <Button
              href={`mailto:${email}`}
              style={{
                borderRadius: "9999px",
                backgroundColor: "#000000",
                padding: "12px 24px",
                color: "#ffffff",
                textDecoration: "none",
                display: "inline-block",
                maxWidth: "100%",
                fontSize: "16px",
              }}
            >
              Reply to {name || "Them"}
            </Button>
            <Text
              style={{
                marginTop: "1rem",
                fontSize: "0.875rem",
                color: "#6b7280",
                fontStyle: "italic",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Sent from Hardik Patel Portfolio | Varanasi, India
            </Text>
            <Link
              href="https://itshardik.vercel.app"
              style={{
                fontSize: "0.875rem",
                color: "#000000",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Visit Portfolio
            </Link>
          </Section>
        </Container>
      </body>
    </Html>
  );
}
