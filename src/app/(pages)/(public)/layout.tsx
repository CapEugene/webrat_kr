import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Авторизация - WebRat",
  description: "Авторизация и регистрация на платформе WebRat",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {children}
    </main>
  );
}