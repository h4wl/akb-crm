import React from 'react'
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from '@clerk/tanstack-react-start'

export default function Header() {
  const { isLoaded, user } = useUser()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <svg
                className="h-8 w-8 text-rose-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C9.243 2 7 4.243 7 7c0 1.657.672 3.157 1.757 4.243A6.002 6.002 0 0 0 6 19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 6.002 6.002 0 0 0-2.757-7.757C16.328 10.157 17 8.657 17 7c0-2.757-2.243-5-5-5z" />
              </svg>
              <span className="text-xl font-semibold text-gray-900">
                Wine Route
              </span>
            </a>
          </div>

          {/* Center: Simple nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm text-gray-700 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-700 hover:text-gray-900">How it works</a>
          </nav>

          {/* Right: Auth controls */}
          <div className="flex items-center space-x-4">
            {/* Show a skeleton while Clerk loads to avoid flicker */}
            {!isLoaded ? (
              <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
            ) : (
              <>
                <SignedIn>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700 hidden sm:inline">
                      {user?.firstName ? `Hi, ${user.firstName}` : 'Welcome'}
                    </span>

                    <UserButton afterSignOutUrl="/" />

                    <SignOutButton>
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      >
                        Sign out
                      </button>
                    </SignOutButton>
                  </div>
                </SignedIn>

                <SignedOut>
                  <div className="flex items-center space-x-2">
                    <SignInButton>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-rose-700 bg-rose-100 hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      >
                        Sign in
                      </button>
                    </SignInButton>
                  </div>
                </SignedOut>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
