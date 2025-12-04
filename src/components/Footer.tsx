import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <Link href="/" className="font-rubik font-bold text-2xl tracking-tight text-black">
                  priowise
               </Link>
               <p className="mt-2 text-sm text-gray-500">
                 Strategic alignment for modern product teams.
               </p>
            </div>
            <div className="flex space-x-6 md:order-2">
                <Link href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                     {/* Icon placeholder */}
                </Link>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
               <p className="text-center text-xs leading-5 text-gray-500">
                 &copy; {new Date().getFullYear()} Priowise Inc. All rights reserved.
               </p>
            </div>
        </div>
      </div>
    </footer>
  );
}
