import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-rubik font-bold text-2xl tracking-tight text-[#2d2d2d]">
            <Image
              src="/Logo-single.png"
              alt="Priowise Logo"
              width={32}
              height={32}
            />
            priowise
          </Link>

          {/* Login / Dashboard */}
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm font-medium text-[#2d2d2d] hover:text-[#f8b62d] transition-colors mr-2 hidden sm:block"
            >
              Insights Blog
            </Link>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-[#f8b62d] text-[#2d2d2d] hover:bg-[#f8b62d]/10 rounded-xl px-6"
                >
                  Login
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button
                    className="bg-[#f8b62d] text-[#2d2d2d] hover:bg-[#f8b62d]/90 rounded-xl px-6"
                  >
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
