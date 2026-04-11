import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Launch Tracker",
  description: "Interactive product release calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex min-h-full flex-col">
              <Header />
              <main className="mx-auto w-full max-w-[90rem] flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                {children}
              </main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
