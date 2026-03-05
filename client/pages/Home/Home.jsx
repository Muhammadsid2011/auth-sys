import React from "react";

function Home() {

  return (
    <div className="relative isolate px-6 pt-6 lg:px-8 overflow-x-hidden">
      {/* Top gradient blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="hero-section-head relative left-1/2 -translate-x-1/2 rotate-12 bg-gradient-to-tr from-primary/30 to-muted/30 opacity-40" />
      </div>

      <div className="mx-auto max-w-2xl py-20 sm:py-24 lg:py-28">
        {/* Announcement pill */}
        <div className="hidden sm:mb-6 sm:flex sm:justify-center">
          <div className="relative rounded-full px-4 py-1.5 text-sm text-muted-foreground ring-1 ring-border hover:bg-accent transition">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-primary">
              Read more →
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Welcome to Auth-Sys
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            A secure authentication system for modern web applications. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora libero excepturi blanditiis aut ipsam incidunt? Odit, fuga corporis? Assumenda at quidem deleniti necessitatibus.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition"
            >
              Get started
            </a>

            <a
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="hero-section-footer relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-muted/30 opacity-40" />
      </div>
    </div>
  )
}

export default Home