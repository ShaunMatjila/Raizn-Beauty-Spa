"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Facial Treatments",
      description:
        "Rejuvenate your skin with our expert facial treatments designed to restore your natural glow and vitality.",
      image: "/facial_spa.webp", // Using your existing hero image as placeholder
      overlay: "Restore Your Glow",
    },
    {
      id: 2,
      title: "Massage Therapy",
      description:
        "Relax and unwind with our therapeutic massage services that melt away stress and tension.",
      image: "/massage.webp", // Using your existing hero image as placeholder
      overlay: "Relax & Unwind",
    },
    {
      id: 3,
      title: "Advanced Beauty",
      description:
        "Revitalize your skin with our advanced treatments featuring micro-needling, chemical peels, and anti-aging therapies for radiant results.",
      image: "/micro_needling.webp",
      overlay: "Advanced Beauty",
    },
    {
      id: 4,
      title: "Nail Services",
      description:
        "Pamper your hands and feet with our professional nail care services including manicures, pedicures, and nail art.",
      image: "/nail_spa.webp", // Using your existing hero image as placeholder
      overlay: "Pamper Your Nails",
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Transform <span className="text-primary">Your Beauty</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our signature treatments designed to enhance your natural
            beauty and provide you with the ultimate spa experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-96 w-full">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={85}
                />

                {/* Dark Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-base">
                      {service.overlay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/services"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 text-lg"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
