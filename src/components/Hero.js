"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.webp"
          alt="Spa Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end min-h-screen container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="w-full">
          <span className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wider mb-4 sm:mb-6 block">
            Welcome to RAIZN Beauty Spa
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
            Beauty Is Your Best <br />
            <span className="text-primary">Investment</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed mb-6 sm:mb-8">
            Step into a world where self-care meets sophistication. Our expert
            therapists and cutting-edge treatments work in harmony to reveal
            your natural radiance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Button
              asChild
              size="xl"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <a href="#booking">Book Your Appointment</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="px-6 py-3 rounded-xl bg-transparent text-white border-2 border-white hover:bg-white/10 font-semibold hover:text-white"
            >
              <a href="#services">View Our Services</a>
            </Button>
          </div>

          {/* Horizontal Line */}
          <hr className="border-white/20 my-6 sm:my-8 max-w-3xl" />

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6 max-w-3xl">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-md">
              <CardContent className="flex flex-col items-center p-4 sm:p-6">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  5k+
                </span>
                <span className="text-xs sm:text-sm text-white/80">
                  Happy Clients
                </span>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-md">
              <CardContent className="flex flex-col items-center p-4 sm:p-6">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  4.9
                </span>
                <span className="text-xs sm:text-sm text-white/80">
                  Customer Rating
                </span>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-md">
              <CardContent className="flex flex-col items-center p-4 sm:p-6">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  5+
                </span>
                <span className="text-xs sm:text-sm text-white/80">
                  Years Experience
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
