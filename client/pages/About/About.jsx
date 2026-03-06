import React from "react";

function About() {
  return (
    <div className="relative isolate px-6 pt-6 lg:px-8 overflow-x-hidden">
      {/* Top gradient blur - matching Home page style */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="hero-section-head relative left-1/2 -translate-x-1/2 rotate-12 bg-gradient-to-tr from-primary/30 to-muted/30 opacity-40" />
      </div>

      <div className="mx-auto max-w-4xl py-20 sm:py-24 lg:py-28">
        {/* About Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Our Mission
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            At Auth-Sys, we believe security shouldn't be a luxury. We're building 
            the infrastructure that allows developers to protect their users without 
            sacrificing the developer experience.
          </p>
        </div>

        {/* Feature Grid / Values */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Security First",
              desc: "Built on industry-standard protocols to ensure your data remains encrypted and safe.",
            },
            {
              title: "Developer Friendly",
              desc: "Integration that takes minutes, not weeks. Our API is built for the modern stack.",
            },
            {
              title: "Scalable Infrastructure",
              desc: "From your first 10 users to your first 10 million, we grow with your business.",
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-border bg-card/50 p-8 hover:bg-accent/50 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Story</h2>
            <p className="mt-6 text-base text-muted-foreground">
              Auth-Sys started in 2024 as a small internal tool. We realized that 
              too many companies were reinventing the wheel when it came to user management. 
              We decided to open-source our core architecture and build a platform 
              that puts privacy and simplicity at the forefront.
            </p>
            <div className="mt-10">
              <a href="/" className="text-sm font-semibold leading-6 text-primary">
                Back to home <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="hero-section-footer relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-muted/30 opacity-40" />
      </div>
    </div>
  );
}

export default About;