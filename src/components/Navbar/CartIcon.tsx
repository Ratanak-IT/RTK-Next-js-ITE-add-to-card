"use client";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { ShoppingCart} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


export default function Navbar() {
  const totalQuantity = useAppSelector((state: RootState) => state.cart.totalQuantity);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "product", href: "/product" },
    { label: "ProductList", href: "/productlist" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about"}
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          shop<span className="text-indigo-600">name</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">

          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Cart (${totalQuantity} items)`}
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={1.75} />
            {totalQuantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-indigo-600 text-white text-[10px] font-semibold rounded-full px-1 leading-none">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

    </nav>
  );
}