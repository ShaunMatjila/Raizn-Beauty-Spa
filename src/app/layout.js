import { Raleway, Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "RAIZN - Relaxation & Wellness",
  description: "Premium spa services for your relaxation and wellness needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${quicksand.variable} ${raleway.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
