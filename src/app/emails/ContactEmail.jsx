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
        }}
      >
        <Container
          style={{
            margin: "2.5rem auto",
            maxWidth: "48rem",
            borderRadius: "0.5rem",
            backgroundColor: "#ffffff",
            padding: "2rem",
            boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Bubble 1: Top-left, light blue gradient bubble with blur and grain simulation */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              width: "24rem",
              height: "24rem",
              borderRadius: "9999px",
              opacity: "0.3",
              background:
                "radial-gradient(circle, #BFDBFE 0%, transparent 70%)",
              backgroundImage:
                "linear-gradient(45deg, #BFDBFE 10%, transparent 10%), linear-gradient(45deg, transparent 20%, #BFDBFE 20%)",
              backgroundSize: "4px 4px",
            }}
          ></div>
          {/* Bubble 2: Bottom-right, light green gradient bubble with blur and grain simulation */}
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              width: "24rem",
              height: "24rem",
              borderRadius: "9999px",
              opacity: "0.3",
              background:
                "radial-gradient(circle, #D1FAE5 0%, transparent 70%)",
              backgroundImage:
                "linear-gradient(45deg, #D1FAE5 10%, transparent 10%), linear-gradient(45deg, transparent 20%, #D1FAE5 20%)",
              backgroundSize: "4px 4px",
            }}
          ></div>

          <Section
            style={{
              marginBottom: "1.5rem",
              textAlign: "start",
              position: "relative",
              zIndex: "10",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "8px",
              }}
            >
              <Img
                src="https://itshardik.vercel.app/assets/hardik.webp"
                width="48"
                height="48"
                style={{
                  borderRadius: "0.75rem",
                  backgroundColor: "#000000",
                  objectFit: "cover",
                  boxShadow: "0 4px 20px -8px var(--shadow-color)",
                  display: "block",
                  outline: "none",
                  border: "none",
                  textDecoration: "none",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    lineHeight: "1",
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
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
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
                lineHeight: "2rem",
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
              position: "relative",
              zIndex: "10",
              width: "100%",
              border: "none",
              borderTop: "1px solid #eaeaea",
            }}
          />
          <Section style={{ position: "relative", zIndex: "10" }}>
            <Text
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: "700",
                color: "#374151",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              Details:
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "24px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <strong>Name:</strong> {name || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "24px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <strong>Email:</strong> {email}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "24px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <strong>Organization:</strong> {organization || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "24px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <strong>Services Interested In:</strong>{" "}
              {service || "Not provided"}
            </Text>
            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "24px",
                marginTop: "16px",
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
              position: "relative",
              zIndex: "10",
              width: "100%",
              border: "none",
              borderTop: "1px solid #eaeaea",
            }}
          />
          <Section
            style={{ textAlign: "center", position: "relative", zIndex: "10" }}
          >
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
                lineHeight: "100%",
              }}
            >
              Reply to {name || "Them"}
            </Button>
            <Text
              style={{
                marginTop: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
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
                lineHeight: "1.25rem",
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
