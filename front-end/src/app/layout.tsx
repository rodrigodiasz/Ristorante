import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Ristorante",
  description: "Gestor de restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="dark:bg-zinc-900 bg-gray-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster
            position="top-center"
            toastOption={{
              style: {
                backgroundColor: "#f1f1f1",
                color: "#131313",
                borderColor: "rgba(255,255,255, 0.5)",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
