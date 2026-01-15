import { Header } from '@/components/home/Header';
import { Footer } from '@/components/home/Footer';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />
      <main className="pt-24 pb-16 min-h-[calc(100vh-theme(spacing.16))]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
