import type { Metadata } from "next";
import { Fraunces, Nunito, Caveat } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themagictreeadventures.com"),
  title: {
    default: "The Magic Tree Adventures — Journey to the Crystal Mountain",
    template: "%s | The Magic Tree Adventures",
  },
  description:
    "A magical children's book about finding your voice, discovering your inner light, and the adventure of a lifetime. Book One of The Magic Tree Adventures series.",
  keywords: [
    "children's book",
    "chakras for kids",
    "mindfulness",
    "bedtime story",
    "crystal mountain",
    "magic tree",
    "Angelica",
    "finding your voice",
    "children's mindfulness book",
    "Sara Oberman Babai",
  ],
  authors: [{ name: "Sara Oberman Babai" }],
  creator: "Sara Oberman Babai",
  publisher: "The Magic Tree Adventures",
  openGraph: {
    title: "The Magic Tree Adventures — Journey to the Crystal Mountain",
    description:
      "A magical children's book about finding your voice, discovering your inner light, and the adventure of a lifetime.",
    type: "website",
    url: "https://themagictreeadventures.com",
    siteName: "The Magic Tree Adventures",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Magic Tree Adventures — Journey to the Crystal Mountain",
    description:
      "A magical children's book about finding your voice, discovering your inner light, and the adventure of a lifetime.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "theme-color": "#FDF6EC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased bg-parchment text-bark-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "The Magic Tree Adventures: Journey to the Crystal Mountain",
              author: {
                "@type": "Person",
                name: "Sara Oberman Babai",
              },
              illustrator: {
                "@type": "Person",
                name: "Alejandra Barajas",
              },
              genre: "Children's fiction",
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: 4,
                suggestedMaxAge: 10,
              },
              description:
                "A magical story about three children who discover a magic apple tree that opens a portal to Angelica, a land of angels and chakras.",
            }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
