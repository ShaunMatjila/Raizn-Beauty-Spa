"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 font-semibold">
                Where Beauty Meets Expertise
              </p>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                At RaizN Cosmetic Boutique, we believe everyone deserves to feel
                their most beautiful. Our Danville studio is a sanctuary where
                expert techniques meet personalized care to enhance your natural
                features.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Specializing in acrylic nails, eyelash extensions, and advanced
                skincare treatments, our certified technicians combine precision
                artistry with premium products to deliver flawless results every
                time.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                More than a beauty destination, we&apos;re a community that celebrates
                self-care as self-love. Every service is designed to help you look
                and feel your absolute best.
              </p>
            </div>
          </div>

          {/* Right Column - Image with Overlay */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[500px]">
              <Image
                src="/about.webp"
                alt="Spa Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30" />
                
                {/* Overlay Card */}
                {/* <div className="absolute bottom-6 right-6 bg-white backdrop-blur-sm rounded-xl p-6 max-w-xs shadow-lg">
                  <h4 className="text-gray-900 text-lg font-semibold mb-2">
                    Experience Excellence
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Book your appointment today and discover the RaizN difference.
                  </p>
                  <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                    Book Now
                  </button>
                </div> */}
            </div>
          </div>
        </div>

        {/* Feature grid below text */}
        <div className="mt-10 mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {[
            {
              title: "Certified Technicians",
              desc: "Our technicians are trained to provide the best service.",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 93.2 100.2"
                  className="mx-auto mb-4 w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <g>
                    <path d="M18.4,54.8c-0.3-1.1-0.8-4.2,0.6-7.7c1.4-3.5,4-5.3,5-5.9"></path>
                    <path d="M51.6,81.8c-1.1,0.5-2.9,1.1-5.2,1.2c-2.3,0-4.2-0.6-5.3-1.2c0.3-0.4,0.6-0.8,0.9-1.2c0.4-0.5,0.9-0.9,1.4-1c0.1,0,0.3-0.1,0.6-0.1c1.2-0.1,1.4,0.4,2.4,0.4c0.9,0,1.2-0.4,2.3-0.3c0.3,0,0.5,0.1,0.7,0.2c0.5,0.2,0.9,0.5,1.2,0.9C51,81,51.3,81.4,51.6,81.8z"></path>
                    <path d="M42.4,85l1.3,1c0.4,0.2,0.9,0.4,1.4,0.4c0.1,0,0.2,0,0.3,0h2c0.2,0,0.4,0,0.6,0c0.5-0.1,0.9-0.2,1.3-0.5l1.1-0.9"></path>
                    <path d="M49.4,72.7c-0.1,0.3-0.3,0.4-1.3,1.1c-1,0.7-2.8,0.7-3.8,0c-1-0.7-1.3-0.8-1.3-1.1"></path>
                    <g>
                      <path d="M29,62.3c0.2-0.1,0.7-0.5,1.5-0.5c0.9,0,1.5,0.4,1.6,0.5c0.5,0.5,1.4,1.1,2.6,1.3c0.9,0.2,1.7,0.1,2.1,0.1c0.5,0,0.8-0.1,2.7-0.6c0.6-0.2,1.2-0.3,1.6-0.4"></path>
                      <path d="M32.3,64.8c0.4-1,1.6-1.2,1.9-1.3"></path>
                    </g>
                    <g>
                      <path d="M63.1,62.3c-0.2-0.1-0.7-0.5-1.5-0.5c-0.9,0-1.5,0.4-1.6,0.5c-0.5,0.5-1.4,1.1-2.6,1.3c-0.9,0.2-1.7,0.1-2.1,0.1c-0.5,0-0.8-0.1-2.7-0.6c-0.6-0.2-1.2-0.3-1.6-0.4"></path>
                      <path d="M57.9,63.5c0.3,0.1,1.5,0.3,1.9,1.3"></path>
                    </g>
                    <path d="M21.8,83.7c0.8-1.3,0.9-2.9,0.2-4.3c-0.5-0.9-1.3-1.7-1.9-2.5c-2.2-2.9-2.1-7.3,0.1-10.1c1-1.4,2.5-2.4,3.4-3.9"></path>
                    <path d="M68.4,63.5c-0.2,4.7-1,8.6-2,12.6c-1.9,7.1-10.5,14.1-16,17.9c-1.4,1-2.9,1.4-4.5,1.4h0.2c-1.6,0-3.1-0.5-4.5-1.4c-5.4-3.8-14.1-10.8-16-17.9c-1.1-4-1.9-8.5-2-13.2c-1.5-1.6-8.1-9.3-7.4-20.2c0.3-4.9,1.9-10.2,5.3-13.9c7.6-8.4,19.9-9.4,28-17"></path>
                    <path d="M41.1,56.4c0,0-1.2-1.6-4-2.1c-2.8-0.5-6.3,0-6.3,0"></path>
                    <path d="M49.6,56.4c0,0,1.2-1.6,4-2.1s6.3,0,6.3,0"></path>
                    <g>
                      <path d="M56.6,26.9c-2.2,4.1-5.5,7.4-9.2,10.1c-3.7,2.7-8,4.6-11.5,7.4c-2.2,1.7-6.5,5.1-9.5,11c-1.5,2.8-2.3,5.7-2.7,7.5"></path>
                      <path d="M48.5,40.2c1.9,0.7,3.9,1.7,6,3c9.2,6,12.6,16,13.9,20.2"></path>
                    </g>
                    <path d="M31.9,17.7C30.1,14.2,30.6,12,31,11c0.9-2.5,3.5-4,5.7-5.2c2.6-1.5,5.1-3.8,8.1-4.4c1.9-0.4,5.1-0.2,14.5,8c6.5,5.8,11.8,11.5,15,19.7c3,7.8,3.8,16.6,0.7,24.5c-2.2,5.6-6.3,9.6-6.3,9.6c-0.1,0.1-0.2,0.2-0.3,0.3"></path>
                    <path d="M37.9,28.8c3-1.8,5.9-3.7,8.6-6c2.6-2.2,4.2-4.6,5.7-7.6"></path>
                    <path d="M76,50.2c0,0,1.3-3.2-3.8-7.9"></path>
                    <path d="M35,89c0,0,2.9,6-0.5,10.1"></path>
                    <path d="M57.4,88.6c0,0-2.9,6,0.5,10.1"></path>
                  </g>
                </svg>
              ),
            },
            {
              title: "Skin Perfection",
              desc: "Advanced facials targeting acne, dark spots, and rejuvenation.",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 93.2 100.2"
                  className="mx-auto mb-4 w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <g>
                    <path d="M14.9,28"></path>
                    <line x1="62.9" y1="15.5" x2="63.2" y2="17.3"></line>
                    <path d="M42.1,42.4c-0.6-0.8-1.2-1.6-1.7-2.5c-4.4-7.8-3.5-19.9-13.1-24c0,0-2.7,6.8,1.8,14.7"></path>
                    <path d="M57.7,50.5c-1.6,2.8-3.9,5.4-6.6,7.1c-3.2,2-6.6,2.2-10.2,2.2c-1.7,0-3.4,0-5.1,0c-13-0.1-16.6,1-18.3-1.6c-1.5-2.2-0.2-7.7,0.8-10.1c-0.4-0.7-4.4-5.9-4.2-13.2c0-0.8,0.2-4.2,2.1-8.2c3.2-6.7,8.9-9.9,11.2-11"></path>
                    <path d="M23.6,18.1c-5.3,7.7-2.2,20,4.1,26.3"></path>
                    <path d="M37.2,30.9c2.1,1,4,2.7,5.5,4.5c3,3.7,3.6,8.1,4.9,12.6"></path>
                    <path d="M30.6,14.6c3.2-1,5.8-1.3,7.8-1.2c5.5,0.1,7.7,1.9,10.8,0.5c2-0.9,5.4-3.6,6.4-4c0.3-0.1,0.7-0.1,0.9,0.1c1.3,1.1,2.2,4,2.2,4l2,0c0.5,0,1,0.2,1.3,0.6l0.9,1.2c1.2-1.2,2.5,0,2.5,0l1.3,1.8l2.5,0.2c4,0.8,3.1,6,2.2,9.2c-0.4,1.5-0.9,3.1-1.2,4.7c-0.2,1,0.4,2.1,1.4,2.4c1.1,0.4,2.3,0.9,3.6,1.5c1.1,0.6,3.6,1.6,5.5,2.4c1.4,0.6,2.8,0.9,4.2,1.1l4.8,0.5"></path>
                    <g>
                      <path d="M23,76.2h26.8c0.9,0,1.6,0.7,1.6,1.6v2.9c0,0.9-0.7,1.6-1.6,1.6H16.6c-1.1,0-2-0.9-2-2v-5.3c0-2.1,1.7-3.8,3.8-3.8h33.8c2.1,0,3.8,1.7,3.8,3.8v7.8c0,2.1-1.7,3.8-3.8,3.8h-48c-0.8,0-1.1-1.1-0.4-1.5l6-4"></path>
                      <line x1="27.7" y1="64.1" x2="16.1" y2="71.8"></line>
                      <line x1="55.4" y1="84.7" x2="63.3" y2="75"></line>
                      <line x1="52.5" y1="71.1" x2="62.8" y2="62.2"></line>
                    </g>
                    <path d="M18.2,48.2l1.8,0.4c3.5,0.8,7,1.2,10.6,1.2h5.5"></path>
                    <path d="M53.8,48.2c0,0,6.2,3.2,7.3,3.8c4.8,2.5,8.4,6.9,7.9,10c-0.1,0.8-0.2,1.6-0.2,2.5c0.2,7,4.8,13.1,11.2,15.8c1.2,0.5,2.3,0.9,3.4,1.4"></path>
                    <path d="M69,62c0.7-1.6,2-4.1,4.6-6c0.9-0.7,2-1.2,3.1-1.6"></path>
                    <path d="M70.3,31.5c0,0-1.5,5.9-4.9,7.5"></path>
                  </g>
                </svg>
              ),
            },
            {
              title: "Personalized Care",
              desc: "Customized treatments to enhance your unique beauty",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 93.2 100.2"
                  className="mx-auto mb-4 w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <g>
                    <g>
                      <path d="M35.2,25.3c-2,0.2-3-0.8-3.5-1.4c0,0,0,0,0,0"></path>
                      <path d="M41.2,15.8c0.1,0,1.5-0.8,2.9,0c1,0.6,1.3,1.7,1.3,2c0.1,0.6,0,1.4-0.4,2.2c-0.5,1-0.9,2.1-1,3.2c-0.1,1.3-0.2,3,0,4.3c0.2,0,0.5,0,0.8,0.1c0.4,0.1,0.6,0.3,0.8,0.4"></path>
                      <path d="M47.4,18.5c0.5,0,1,0.1,1.5,0.3c1,0.5,1.3,1.9,1.3,2c0,0.2,0.1,0.8-0.2,2c-0.5,1.7-1.2,2.1-1.6,3.4c-0.2,0.7-0.4,1.6-0.1,3c0.1,0,0.4,0.1,0.6,0.3c0.2,0.2,0.4,0.4,0.4,0.5"></path>
                      <path d="M52.1,22.7c0.5,0.1,1.1,0.3,1.4,0.7c0.3,0.3,0.4,0.7,0.5,0.9c0.4,1.2-0.1,2.3-0.7,3.4c-0.6,1.2-1,2.4-1.1,3.8c0.1,0,0.2,0.1,0.3,0.1c0.2,0.1,0.4,0.3,0.4,0.4"></path>
                      <path d="M41.2,26.6c-0.2-0.1-0.5-0.3-0.9-0.5c-0.8-0.3-1.3,0.1-1.5-0.2c-0.4-0.3,0.1-1.2,0.5-2.9c0,0,0.3-0.9,0.5-2.3c0.2-2.7-0.4-5.9-3.3-6.7c-2.3-0.6-4.9,0.4-5.5,2.8c-0.5,1.8-0.1,3.8,0.3,5.6c0.1,0.5,0.3,1,0.6,1.4c0,0,0,0.1,0.1,0.1c1,2,0.1,3.9,0.1,3.9c-3.6,6.2-1.7,12.6,0.5,18.8c0.5,1.4,1,2.7,1.4,4.1c0.3,1,0.6,2.1,0.9,3.1c0.4,1.4,0.7,2.8,0.9,4.2c0,0.2,0.1,0.5,0.1,0.7c0.3,2.3,0.2,4.5,0,6.6"></path>
                      <path d="M34.8,80.9c0.4,1,0.9,1.8,1.7,2.6c3.2,3.3,7.9,2.8,8.2,2.8c2.3-0.1,4.4-1.2,5.8-2.9c1.8-2.1,2.2-4.7,2.5-7.4c0.5-5.4,0.2-7.9,0.8-13.3"></path>
                      <path d="M56,48.1c0.6-3.5,0.5-3.2,1.4-6.7c0,0,0,0,0,0c0.6-2.7,0.1-5.5-1.5-7.8l0,0c-0.5-0.7,0.1-1.7,0.5-2.2c0.5-0.6,0.8-1.4,0.9-2.2c0-0.3,0-0.9-0.3-1.4c-0.3-0.5-0.7-0.7-0.9-0.8"></path>
                    </g>
                    <g>
                      <path d="M69.5,64.3C68.3,58,69.8,52,69.8,45.7l2.3-9.4c0.1-0.5-0.1-1-0.6-1.2c-0.6-0.3-1.2,0-1.5,0.6l-2.7,6"></path>
                      <path d="M57.3,41.3c0.5,0.9,0.9,1.6,1.4,2.9l-0.1,5.1c-0.1,1.3-1.1,2.4-2.4,2.5c-0.3,0-0.6,0-0.9,0c-0.2,0-0.4-0.1-0.7-0.2c-1-0.7-2-1.4-3-2.1c-1.5-1-3.3-2.8-5.2-1.8c-0.2,0.1-1.7,1.2-1.5,1.4c1.5,1.3,3.3,2.4,4.7,3.9c1.8,2,2.6,4.6,4.4,6.5c0.3,0.3,0.6,0.6,0.9,0.8c2.1,1.7,4.4,2.9,5.5,5.5"></path>
                      <polyline points="57.3,36.6 61.5,42.1 63.8,46.5"></polyline>
                      <polyline points="58,37.5 64,40 66.5,44.3"></polyline>
                    </g>
                    <g>
                      <path d="M34.7,54l-1.8,6.3l0.4,5.6c0.1,1.3,1.2,2.3,2.5,2.5c0.5,0.1,1.1,0,1.6-0.3c1-0.7,2-1.5,2.9-2.2c1.4-1.1,3.2-2.9,5.1-2c0.2,0.1,1.7,1.2,1.5,1.4c-1.6,1.5-3.7,2.9-5.1,4.6c-0.7,0.9-1.2,2-1.7,3c-0.9,1.6-1.8,3.2-3.2,4.4c-0.7,0.6-1.6,0.8-2.4,1.3c-1.3,0.9-2,2.3-2.6,3.8l-0.4,2"></path>
                      <path d="M33.8,51l-4.2,7.2L28,63.1c0,0-0.6,1.1-1.2,1.6"></path>
                      <path d="M23.1,83.3c0.2-0.7,0.4-1.5,0.6-2.6c0.7-4.1-0.1-11.4-0.4-14.3c-0.1-0.8,0-1.6,0.3-2.3l2.2-5.1c0.5-1,1.2-1.9,2.2-2.5l4.4-2.8"></path>
                    </g>
                    <path d="M42.8,52.6c-0.5-0.7-0.8-1.5-0.9-2.4c-0.3-3,1.8-5.7,4.8-6c0.7-0.1,1.3,0,2,0.1"></path>
                  </g>
                </svg>
              ),
            },
            {
              title: "Relaxing Massage",
              desc: "Therapeutic massage treatments to melt away stress and tension.",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 34.8 34.8"
                  className="mx-auto mb-4 w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <g>
                    <circle cx="4.3" cy="15.2" r="2.2"></circle>
                    <line x1="3.6" y1="21.8" x2="3.6" y2="31.9"></line>
                    <line x1="31.2" y1="21.8" x2="31.2" y2="31.9"></line>
                    <circle cx="18.1" cy="5.1" r="2.2"></circle>
                    <g>
                      <path d="M15.9,13.8l0.5,3.6h3.4l0.5-3.6l2.2,3.6h1.4l-2.5-6.3c-0.2-0.6-0.8-0.9-1.3-0.9h-3.8c-0.6,0-1.1,0.4-1.3,0.9
                        l-2.5,6.3h1.4L15.9,13.8z"></path>
                      <polygon points="17,21.8 18.1,30.5 19.3,21.8"></polygon>
                    </g>
                    <path d="M31.9,21.8h-29c-1.2,0-2.2-1-2.2-2.2l0,0c0-1.2,1-2.2,2.2-2.2h29c1.2,0,2.2,1,2.2,2.2l0,0
                      C34.1,20.8,33.1,21.8,31.9,21.8z"></path>
                  </g>
                </svg>
              ),
            },
          ].map((feature, idx) => (
            <div
              key={feature.title}
              className="p-6 hover:scale-105 transition-transform duration-300"
            >
              {feature.svg}
              <div className="mx-auto border-t border-gray-200 my-4"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
