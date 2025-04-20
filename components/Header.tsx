"use client"

import { Cuboid, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="border-b relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded flex items-center justify-center mr-2 shadow-md transition-transform group-hover:scale-105">
            <Cuboid className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl sm:text-2xl">
            <span className="block sm:hidden">PFA</span>
            <span className="hidden sm:block">Personal Finance Advisor</span>
          </h1>
        </Link>

        {/* Hamburger menu button - visible only on small screens */}
        <button
          className="sm:hidden cursor-pointer flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Main menu"
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation - hidden on small screens */}
        <nav className="hidden sm:block" aria-label="Main navigation">
          <ul className="flex gap-6 text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-emerald-600",
                    pathname === link.href ? "font-semibold text-emerald-600" : "",
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu - shown when hamburger is clicked */}
      {isMenuOpen && (
        <div id="mobile-menu" className="sm:hidden absolute top-full left-0 right-0 bg-white z-50 border-b shadow-lg">
          <nav className="container mx-auto px-4 py-3" aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-2 px-3 rounded-md transition-colors hover:bg-gray-100 hover:text-emerald-600",
                      pathname === link.href ? "font-semibold text-emerald-600 bg-gray-50" : "",
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
