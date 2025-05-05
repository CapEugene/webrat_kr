import { Header } from "@/components/desktop/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <Header />
      <main className="w-full">{children}</main>
    </div>
  );
}
