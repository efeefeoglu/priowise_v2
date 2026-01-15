import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-rubik font-bold text-2xl tracking-tight text-[#2d2d2d]">
            priowise
          </Link>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Button
                variant="outline"
                className="border-[#f8b62d] text-[#2d2d2d] hover:bg-[#f8b62d]/10 rounded-xl px-6"
                asChild
              >
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <Button
                variant="outline"
                className="border-[#f8b62d] text-[#2d2d2d] hover:bg-[#f8b62d]/10 rounded-xl px-6"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
