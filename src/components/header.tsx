import React from 'react'
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  useUser,
} from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'

export default function Header() {
  const { isLoaded, user } = useUser()

  return (
    <header className="bg-gradient-to-r from-burgundy to-amber sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left: Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white font-extrabold text-2xl md:text-3xl tracking-tight"
        >
          <span className="text-3xl md:text-4xl">😠</span>
          <span>Crmudgeon</span>
        </Link>

        {/* Center: Nav (desktop) */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="text-white/90 font-semibold px-4 py-2 rounded-xl text-sm uppercase tracking-wide hover:bg-white/15 transition-colors"
          >
            My Day
          </Link>
          <Link
            to="/routes"
            className="text-white/90 font-semibold px-4 py-2 rounded-xl text-sm uppercase tracking-wide hover:bg-white/15 transition-colors"
          >
            Accounts
          </Link>
        </nav>

        {/* Right: Auth controls */}
        <div className="flex items-center gap-3">
          {!isLoaded ? (
            <div className="h-8 w-24 bg-white/20 rounded-xl animate-pulse" />
          ) : (
            <>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-4 py-2 rounded-xl font-bold text-sm text-burgundy shadow-sm hidden sm:block">
                    {user?.firstName || 'User'}
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button
                    type="button"
                    className="bg-white px-4 py-2 rounded-xl font-bold text-sm text-burgundy shadow-sm hover:bg-white/90 transition-colors"
                  >
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
