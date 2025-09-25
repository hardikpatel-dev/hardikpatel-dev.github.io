import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
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
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-3xl rounded-lg bg-white p-8 shadow-md relative overflow-hidden">
            {/* Bubble 1: Top-left, light blue gradient bubble with blur and grain simulation */}
            <div
              className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #BFDBFE 0%, transparent 70%)",
                backgroundImage:
                  "linear-gradient(45deg, #BFDBFE 10%, transparent 10%), linear-gradient(45deg, transparent 20%, #BFDBFE 20%)",
                backgroundSize: "4px 4px",
              }}
            ></div>
            {/* Bubble 2: Bottom-right, light green gradient bubble with blur and grain simulation */}
            <div
              className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #D1FAE5 0%, transparent 70%)",
                backgroundImage:
                  "linear-gradient(45deg, #D1FAE5 10%, transparent 10%), linear-gradient(45deg, transparent 20%, #D1FAE5 20%)",
                backgroundSize: "4px 4px",
              }}
            ></div>

            <Section className="mb-6 text-start relative z-10">
              <div
                className="flex items-center justify-start gap-2 logo"
                style={{ gap: "8px", alignItems: "center", display: "flex" }}
              >
                <Img
                  src="https://itshardik.vercel.app/assets/hardik.webp"
                  className="w-12 h-12 rounded-xl bg-black object-cover shadow-[0_4px_20px_-8px_var(--shadow-color)]"
                />{" "}
                <div
                  className="flex flex-col gap-1"
                  style={{
                    gap: "4px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className="text-xs tracking-wide font-whyte uppercase font-extrabold leading-none">
                    Hardik Patel
                  </span>
                  <span className="text-[10px] text-text leading-none font-primary flex items-center justify-start gap-1">
                    <b className="text-text uppercase">Frontend Developer</b>
                  </span>
                </div>
              </div>
              <Heading className="mt-4 text-2xl font-bold font-whyte text-gray-800">
                New Contact Inquiry
              </Heading>
            </Section>
            <Hr className="my-4 border-gray-300 relative z-10" />
            <Section className="relative z-10">
              <Text className="text-lg font-bold text-gray-700 font-whyte">
                Details:
              </Text>
              <Text className="text-gray-600">
                <strong>Name:</strong> {name || "Not provided"}
              </Text>
              <Text className="text-gray-600">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-gray-600">
                <strong>Organization:</strong> {organization || "Not provided"}
              </Text>
              <Text className="text-gray-600">
                <strong>Services Interested In:</strong>{" "}
                {service || "Not provided"}
              </Text>
              <Text className="text-gray-600">
                <strong>Message:</strong> {message}
              </Text>
            </Section>
            <Hr className="my-4 border-gray-300 relative z-10" />
            <Section className="text-center relative z-10">
              <Button
                href={`mailto:${email}`}
                className="rounded-full bg-black px-6 py-3 text-white no-underline"
              >
                Reply to {name || "Them"}
              </Button>
              <Text className="mt-4 text-sm text-gray-500 italic font-medium">
                Sent from Hardik Patel Portfolio | Varanasi, India
              </Text>
              <Link
                href="https://itshardik.vercel.app"
                className="text-sm text-black font-bold font-whyte"
              >
                Visit Portfolio
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
