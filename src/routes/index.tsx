import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/tanstack-react-start'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-6 shadow-sm">
      <div className="mb-4 h-10 w-10 text-burgundy">{icon}</div>
      <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        {description}
      </p>
    </div>
  )
}

function Home() {
  const { isLoaded } = useUser()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#1C1816]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-burgundy/10 to-stone-50 dark:from-burgundy/20 dark:to-[#1C1816]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
              <span className="text-5xl sm:text-6xl">😠</span> Crmudgeon — CRM
              built for distributors
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-600 dark:text-stone-400">
              Manage accounts, see who needs outreach today, and plan the most
              efficient route to your visits — all in one simple tool.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-burgundy to-malt px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all">
                    Sign in to get started
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link
                  to="/routes"
                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-burgundy to-malt px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all"
                >
                  Open App
                </Link>
                <UserButton />
              </SignedIn>

              <a
                href="#features"
                className="text-sm font-semibold text-burgundy hover:underline"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="mt-10 w-full max-w-md rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 shadow-md lg:mt-0">
            <div
              className="aspect-video w-full rounded-xl bg-stone-100 dark:bg-stone-700"
              aria-hidden="true"
            />
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
              Product preview placeholder
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-extrabold text-stone-800 dark:text-stone-100">
            Designed for wine & beer distributor sales teams
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Focus on the right accounts at the right time, then hit the road
            with an optimized route.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M5 3h14a2 2 0 0 1 2 2v2H3V5a2 2 0 0 1 2-2zm-2 8h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6zm5 2a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z" />
              </svg>
            }
            title="Daily outreach summary"
            description="Wake up to a clear list of who needs contact today based on schedules, follow-ups, and order cycles."
          />
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12l-6-3-6 3V6z" />
              </svg>
            }
            title="Account-centric CRM"
            description="Notes, tasks, and order context organized per customer — lightweight and fast for on-the-go work."
          />
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 .9-1.45-3.9-2.3V7z" />
              </svg>
            }
            title="Optimized route planning"
            description="Build the most efficient driving route across your visits, minimizing time and mileage."
          />
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M7 4h10v2H7V4zm0 6h10v2H7v-2zm0 6h10v2H7v-2z" />
              </svg>
            }
            title="Simple scheduling"
            description="Plan visits by day and auto-roll follow-ups so nothing slips through the cracks."
          />
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-9 9a9 9 0 0 1 18 0H3z" />
              </svg>
            }
            title="Territory focus"
            description="Tag accounts by area, day, and product focus to streamline weekly planning."
          />
          <Feature
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="currentColor"
              >
                <path d="M4 4h16v4H4V4zm0 6h10v10H4V10zm12 0h4v10h-4V10z" />
              </svg>
            }
            title="Fast and mobile"
            description="Works great on the phone in between stops with clean, touch-friendly design."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white dark:bg-stone-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-extrabold text-stone-800 dark:text-stone-100">
            How it works
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-6">
              <span className="text-sm font-bold text-burgundy">Step 1</span>
              <h3 className="mt-2 text-lg font-semibold text-stone-800 dark:text-stone-100">
                Add your accounts
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Import or create customers with basic details, tags, and
                cadence.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-6">
              <span className="text-sm font-bold text-burgundy">Step 2</span>
              <h3 className="mt-2 text-lg font-semibold text-stone-800 dark:text-stone-100">
                Plan your day
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                See who needs contact today, prioritize, and set visit order.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-6">
              <span className="text-sm font-bold text-burgundy">Step 3</span>
              <h3 className="mt-2 text-lg font-semibold text-stone-800 dark:text-stone-100">
                Drive the optimal route
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Generate an efficient route across stops to save time and miles.
              </p>
            </div>
          </div>

          <div className="mt-10">
            {!isLoaded ? (
              <div className="h-10 w-40 animate-pulse rounded-xl bg-stone-100 dark:bg-stone-700" />
            ) : (
              <>
                <SignedOut>
                  <SignInButton>
                    <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-burgundy to-malt px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all">
                      Sign in to start planning
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/routes"
                      className="inline-flex items-center rounded-xl bg-gradient-to-r from-burgundy to-malt px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all"
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
      <footer className="border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1816]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-stone-600 dark:text-stone-400">
          <p>
            © {new Date().getFullYear()} Crmudgeon. Built for distributor sales
            teams.
          </p>
        </div>
      </footer>
    </div>
  )
}
