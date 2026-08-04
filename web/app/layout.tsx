import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mercadinho Commerce",
  description: "Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <header className="border-b border-zinc-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center gap-5 p-4 text-sm font-medium">
            <Link href="/" className="text-base font-semibold tracking-tight">
              Vitrine.br
            </Link>
            <Link href="/login" className="text-zinc-600 hover:text-zinc-900">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="text-zinc-600 hover:text-zinc-900"
            >
              Meus produtos
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}
