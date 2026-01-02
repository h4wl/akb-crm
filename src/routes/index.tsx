import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/tanstack-react-start'
import { createFileRoute, Link } from '@tanstack/react-router'
import Header from '../components/header'

export const Route = createFileRoute('/')({
  component: Home,
})

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 h-10 w-10 text-rose-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  )
}

function Home() {
  const { isLoaded, isSignedIn, user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-rose-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Wine Route — CRM built for distributors
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              Manage accounts, see who needs outreach today, and plan the most efficient route to your visits — all in one simple tool.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <button className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500">
                    Sign in to get started
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Open App
                </Link>
                <UserButton />
              </SignedIn>

              <a href="#features" className="text-sm font-medium text-rose-700 hover:text-rose-800">
                Learn more
              </a>
            </div>
          </div>

          <div className="mt-10 w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:mt-0">
            <div className="aspect-video w-full rounded-lg bg-gray-100" aria-hidden="true" />
            <p className="mt-3 text-xs text-gray-500">Product preview placeholder</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Designed for wine & beer distributor sales teams</h2>
          <p className="mt-2 text-gray-700">
            Focus on the right accounts at the right time, then hit the road with an optimized route.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M5 3h14a2 2 0 0 1 2 2v2H3V5a2 2 0 0 1 2-2zm-2 8h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6zm5 2a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"/></svg>}
            title="Daily outreach summary"
            description="Wake up to a clear list of who needs contact today based on schedules, follow-ups, and order cycles."
          />
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12l-6-3-6 3V6z"/></svg>}
            title="Account-centric CRM"
            description="Notes, tasks, and order context organized per customer — lightweight and fast for on-the-go work."
          />
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 .9-1.45-3.9-2.3V7z"/></svg>}
            title="Optimized route planning"
            description="Build the most efficient driving route across your visits, minimizing time and mileage."
          />
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M7 4h10v2H7V4zm0 6h10v2H7v-2zm0 6h10v2H7v-2z"/></svg>}
            title="Simple scheduling"
            description="Plan visits by day and auto-roll follow-ups so nothing slips through the cracks."
          />
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-9 9a9 9 0 0 1 18 0H3z"/></svg>}
            title="Territory focus"
            description="Tag accounts by area, day, and product focus to streamline weekly planning."
          />
          <Feature
            icon={<svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor"><path d="M4 4h16v4H4V4zm0 6h10v10H4V10zm12 0h4v10h-4V10z"/></svg>}
            title="Fast and mobile"
            description="Works great on the phone in between stops with clean, touch-friendly design."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <span className="text-sm font-medium text-rose-700">Step 1</span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">Add your accounts</h3>
              <p className="mt-2 text-sm text-gray-600">Import or create customers with basic details, tags, and cadence.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <span className="text-sm font-medium text-rose-700">Step 2</span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">Plan your day</h3>
              <p className="mt-2 text-sm text-gray-600">See who needs contact today, prioritize, and set visit order.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <span className="text-sm font-medium text-rose-700">Step 3</span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">Drive the optimal route</h3>
              <p className="mt-2 text-sm text-gray-600">Generate an efficient route across stops to save time and miles.</p>
            </div>
          </div>

          <div className="mt-10">
            {!isLoaded ? (
              <div className="h-10 w-40 animate-pulse rounded bg-gray-100" />
            ) : (
              <>
                <SignedOut>
                  <SignInButton>
                    <button className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500">
                      Sign in to start planning
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/"
                      className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Open App
                    </Link>
                    <UserButton />
                  </div>
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Wine Route. Built for distributor sales teams.
          </p>
        </div>
      </footer>
    </div>
  )
}
