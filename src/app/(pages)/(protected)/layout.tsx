import { Footer } from "@/components/desktop/footer";
import { Header } from "@/components/desktop/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex flex-col bg-white">{children}</main>
      <Footer />
    </div>
  );
}
