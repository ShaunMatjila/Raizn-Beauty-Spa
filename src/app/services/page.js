"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ServicesNavbar from "@/components/ServicesNavbar";
import FooterSection from "@/components/Footer";

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "nail-services",
      title: "Nail Services",
      services: [
        {
          title: "Full Set Acrylic Nails",
          name: "Full Set Acrylic Nails",
          description:
            "Experience flawless, salon-quality nails with our premium acrylic sets. Custom-shaped to perfection with a mirror-like shine that lasts for weeks.",
          image: "/images/nails.webp",
          price: 250,
          duration: 90,
          category: "Nail Services",
        },
        {
          title: "Rubber Base Gel",
          name: "Rubber Base Gel",
          description:
            "Flexible gel manicure that provides a protective shield with a naturally glossy finish that resists chipping for up to 3 weeks.",
          image: "/images/gel-nails.webp",
          price: 220,
          duration: 60,
          category: "Nail Services",
        },
        {
          title: "Acrylic Overlay",
          name: "Acrylic Overlay",
          description:
            "Strengthens natural nails with durable protection while maintaining a lightweight feel for flawless growth.",
          image: "/images/overlay.webp",
          price: 250,
          duration: 75,
          category: "Nail Services",
        },
        {
          title: "Ombre Nails",
          name: "Ombre Nails",
          description:
            "Stunning gradient color effect that transitions beautifully from cuticle to tip for special occasions or everyday glam.",
          image: "/images/ombre-nails.webp",
          price: 300,
          duration: 90,
          category: "Nail Services",
        },
        {
          title: "Hand Treatment",
          name: "Hand Treatment",
          description:
            "Intensive therapy with nourishing masks and massage to improve skin texture and elasticity.",
          image: "/images/hand-treatment.webp",
          price: 200,
          duration: 45,
          category: "Nail Services",
        },
        {
          title: "Gel Toes",
          name: "Gel Toes",
          description:
            "Long-lasting gel polish application for toes with chip-resistant shine.",
          image: "/images/gel-toes.webp",
          price: 150,
          duration: 45,
          category: "Nail Services",
        },
        {
          title: "Foot Spa",
          name: "Foot Spa",
          description:
            "Revitalizing treatment including soak, scrub, massage and mask for tired feet.",
          image: "/images/foot-spa.webp",
          price: 200,
          duration: 60,
          category: "Nail Services",
        },
      ],
    },
    {
      id: "eyelash-services",
      title: "Eyelash Services",
      services: [
        {
          title: "Individual Eyelashes",
          name: "Individual Eyelashes",
          description:
            "Natural-looking extensions carefully applied for length and volume without heaviness, lasting 3-4 weeks.",
          image: "/images/individual-lashes.webp",
          price: 300,
          duration: 120,
          category: "Eyelash Services",
        },
        {
          title: "Volume Lashes",
          name: "Volume Lashes",
          description:
            "Dramatic fullness using ultra-fine lash fans, giving 2-3 times the density while remaining lightweight.",
          image: "/images/volume-lashes.webp",
          price: 500,
          duration: 150,
          category: "Eyelash Services",
        },
        {
          title: "Hybrid Lashes",
          name: "Hybrid Lashes",
          description:
            "Perfect blend of individual and volume lashes creating dimensional beauty with an eye-opening effect.",
          image: "/images/hybrid-lashes.webp",
          price: 400,
          duration: 135,
          category: "Eyelash Services",
        },
        {
          title: "Cluster Lashes",
          name: "Cluster Lashes",
          description:
            "Temporary lash clusters for instant glamour without commitment - perfect for special occasions.",
          image: "/images/cluster-lashes.webp",
          price: 200,
          duration: 60,
          category: "Eyelash Services",
        },
        {
          title: "Strip Lashes",
          name: "Strip Lashes",
          description:
            "Professional application customized to your eye shape with premium adhesive that lasts all day.",
          image: "/images/strip-lashes.webp",
          price: 100,
          duration: 30,
          category: "Eyelash Services",
        },
      ],
    },
    {
      id: "advanced-facial-treatments",
      title: "Advanced Facial Treatments",
      services: [
        {
          title: "After Shave Bumps Removal",
          name: "After Shave Bumps Removal",
          description:
            "Specialized treatment using advanced techniques to soothe and eliminate razor bumps and irritation.",
          image: "/images/bump-removal.webp",
          price: 650,
          duration: 60,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Acne & Dark Spot Treatment",
          name: "Acne & Dark Spot Treatment",
          description:
            "Targeted solution combining deep cleansing with brightening agents to clarify problematic skin.",
          image: "/images/acne-treatment.webp",
          price: 850,
          duration: 75,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Dermaplaning",
          name: "Dermaplaning",
          description:
            "Precision exfoliation that removes peach fuzz and dead skin for ultra-smooth, radiant complexion.",
          image: "/images/dermaplaning.webp",
          price: 400,
          duration: 45,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Microneedling",
          name: "Microneedling",
          description:
            "Collagen induction therapy using micro-channels to stimulate skin renewal and reduce scarring.",
          image: "/images/microneedling.webp",
          price: 850,
          duration: 90,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Hyperpigmentation Treatment",
          name: "Hyperpigmentation Treatment",
          description:
            "Advanced formula to even out skin tone and reduce discoloration for uniform complexion.",
          image: "/images/hyperpigmentation.webp",
          price: 850,
          duration: 75,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Eye Back Treatment",
          name: "Eye Back Treatment",
          description:
            "Specialized care for the delicate eye area to reduce puffiness, dark circles and fine lines.",
          image: "/images/eye-treatment.webp",
          price: 500,
          duration: 45,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Microdermabrasion",
          name: "Microdermabrasion",
          description:
            "Mechanical exfoliation that polishes skin to reveal fresher, younger-looking complexion.",
          image: "/images/microdermabrasion.webp",
          price: 650,
          duration: 60,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Hydrolifting Facial",
          name: "Hydrolifting Facial",
          description:
            "Intense hydration treatment that plumps skin and restores vital moisture balance.",
          image: "/images/hydrolifting.webp",
          price: 700,
          duration: 60,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Chemical Peel",
          name: "Chemical Peel",
          description:
            "Professional-strength resurfacing treatment to improve texture, tone and clarity.",
          image: "/images/chemical-peel.webp",
          price: 600,
          duration: 60,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Skin Tags Removal",
          name: "Skin Tags Removal",
          description:
            "Safe and effective removal of skin tags with minimal discomfort and quick healing.",
          image: "/images/skin-tags.webp",
          price: 850,
          duration: 30,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Stretch Marks Removal",
          name: "Stretch Marks Removal",
          description:
            "4-session package using advanced technology to reduce the appearance of stretch marks.",
          image: "/images/stretch-marks.webp",
          price: 3000,
          duration: 120,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Keloids Removal",
          name: "Keloids Removal",
          description:
            "Specialized treatment to flatten and reduce raised scar tissue with professional care.",
          image: "/images/keloids.webp",
          price: 800,
          duration: 45,
          category: "Advanced Facial Treatments",
        },
        {
          title: "Algae Peel",
          name: "Algae Peel",
          description:
            "Detoxifying treatment using nutrient-rich marine algae to purify and revitalize skin.",
          image: "/images/algae-peel.webp",
          price: 700,
          duration: 60,
          category: "Advanced Facial Treatments",
        },
      ],
    },
    {
      id: "waxing-services",
      title: "Waxing Services",
      services: [
        {
          title: "Full Legs Wax",
          name: "Full Legs Wax",
          description:
            "Complete hair removal from thighs to ankles for silky smooth legs that last weeks.",
          image: "/images/leg-wax.webp",
          price: 400,
          duration: 60,
          category: "Waxing Services",
        },
        {
          title: "Under Arms Wax",
          name: "Under Arms Wax",
          description:
            "Quick and hygienic underarm hair removal with slower regrowth than shaving.",
          image: "/images/underarm-wax.webp",
          price: 150,
          duration: 20,
          category: "Waxing Services",
        },
        {
          title: "Full Face Wax",
          name: "Full Face Wax",
          description:
            "Precise removal of facial hair including upper lip, chin and sideburns for clean look.",
          image: "/images/face-wax.webp",
          price: 150,
          duration: 30,
          category: "Waxing Services",
        },
        {
          title: "Eyebrows Wax",
          name: "Eyebrows Wax",
          description:
            "Expert shaping and definition to frame your eyes perfectly with clean arches.",
          image: "/images/brow-wax.webp",
          price: 50,
          duration: 15,
          category: "Waxing Services",
        },
        {
          title: "Brazilian Wax",
          name: "Brazilian Wax",
          description:
            "Complete intimate hair removal with attention to comfort and hygiene standards.",
          image: "/images/brazilian-wax.webp",
          price: 200,
          duration: 45,
          category: "Waxing Services",
        },
        {
          title: "Hollywood Wax",
          name: "Hollywood Wax",
          description:
            "Complete intimate hair removal including front, back and everything in between.",
          image: "/images/hollywood-wax.webp",
          price: 300,
          duration: 60,
          category: "Waxing Services",
        },
      ],
    },
    {
      id: "brow-services",
      title: "Brow Services",
      services: [
        {
          title: "Microblading",
          name: "Microblading",
          description:
            "Semi-permanent technique creating natural hair strokes for perfectly shaped brows.",
          image: "/images/microblading.webp",
          price: 1200,
          duration: 120,
          category: "Brow Services",
        },
        {
          title: "Ombré Brows",
          name: "Ombré Brows",
          description:
            "Powdered effect with soft gradient from start to tail for a defined yet natural look.",
          image: "/images/ombre-brows.webp",
          price: 1200,
          duration: 120,
          category: "Brow Services",
        },
        {
          title: "Brow Retouch",
          name: "Brow Retouch",
          description:
            "Maintenance session to refresh and perfect your microbladed or ombré brows.",
          image: "/images/brow-retouch.webp",
          price: 800,
          duration: 60,
          category: "Brow Services",
        },
        {
          title: "Brow Tinting",
          name: "Brow Tinting",
          description:
            "Color enhancement using premium dyes to darken and define sparse brows.",
          image: "/images/brow-tint.webp",
          price: 100,
          duration: 30,
          category: "Brow Services",
        },
        {
          title: "Brow Shaping",
          name: "Brow Shaping",
          description:
            "Professional design service to create your ideal arch and brow proportions.",
          image: "/images/brow-shaping.webp",
          price: 30,
          duration: 20,
          category: "Brow Services",
        },
        {
          title: "Brow Shading",
          name: "Brow Shading",
          description:
            "Soft powder effect that fills sparse areas for naturally full-looking brows.",
          image: "/images/brow-shading.webp",
          price: 50,
          duration: 25,
          category: "Brow Services",
        },
        {
          title: "Eyebrow Lifting",
          name: "Eyebrow Lifting",
          description:
            "Lifting treatment that opens up the eye area for a more youthful appearance.",
          image: "/images/brow-lift.webp",
          price: 400,
          duration: 45,
          category: "Brow Services",
        },
      ],
    },
    {
      id: "massage-body-treatments",
      title: "Massage & Body Treatments",
      services: [
        // {
        //   title: "Hot Stone Massage",
        //   name: "Hot Stone Massage",
        //   description:
        //     "Heated basalt stones melt away tension while improving circulation and relaxation.",
        //   image: "/images/stone.webp",
        //   price: 950,
        //   duration: 90,
        //   category: "Massage & Body Treatments",
        // },
        {
          title: "Therapeutic Massage",
          name: "Therapeutic Massage",
          description:
            "Customized pressure combining Swedish and deep tissue techniques for pain relief.",
          image: "/images/massage.webp",
          price: 1000,
          duration: 75,
          category: "Massage & Body Treatments",
        },
        // {
        //   title: "Swedish Massage",
        //   name: "Swedish Massage",
        //   description: "Classic full-body massage using long, flowing strokes to reduce tension and improve circulation.",
        //   image: "/images/swedish-massage.webp",
        //   price: 850,
        //   duration: 60,
        //   category: "Massage & Body Treatments",
        // },
        {
          title: "Deep Tissue Massage",
          name: "Deep Tissue Massage",
          description:
            "Intense, focused massage that targets deeper layers of muscle and connective tissue to relieve chronic pain.",
          image: "/images/deep-tissue-massage.webp",
          price: 1100,
          duration: 75,
          category: "Massage & Body Treatments",
        },
        {
          title: "Aromatherapy Massage",
          name: "Aromatherapy Massage",
          description:
            "A gentle massage using essential oils to promote relaxation, and emotional and physical well-being.",
          image: "/images/aromatherapy-massage.webp",
          price: 900,
          duration: 60,
          category: "Massage & Body Treatments",
        },
        {
          title: "Face Scrub",
          name: "Face Scrub",
          description:
            "Gentle exfoliation using jojoba beads to refine pores and smooth skin texture.",
          image: "/images/face-scrub.webp",
          price: 650,
          duration: 45,
          category: "Massage & Body Treatments",
        },
        {
          title: "Facial Mask",
          name: "Facial Mask",
          description:
            "Targeted treatment masks for hydration, brightening or clarifying based on skin needs.",
          image: "/images/facial-mask.webp",
          price: 550,
          duration: 30,
          category: "Massage & Body Treatments",
        },
        {
          title: "Foot Scrub",
          name: "Foot Scrub",
          description:
            "Revitalizing treatment that exfoliates and softens feet, leaving them refreshed and smooth.",
          image: "/images/foot-scrub.webp",
          price: 300,
          duration: 30,
          category: "Massage & Body Treatments",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-lime-50">
      {/* Banner */}
      <div className="relative min-h-[70vh]">
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

        <div className="relative z-10 flex items-end min-h-[80vh] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
          <div className="w-full">
            <span className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wider mb-4 sm:mb-6 block">
              RaizN Beauty Spa
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Our Services & Pricing
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl">
              Discover our complete range of beauty treatments designed to help
              you look and feel your absolute best.
            </p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <ServicesNavbar />

      {/* Welcome Section */}
      <div
        id="services"
        className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-4xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Your Journey to Radiant Beauty Starts Here
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Raizn Beauty Spa, we believe everyone deserves to feel confident
            and beautiful. Our expert team of licensed professionals uses
            cutting-edge techniques and premium products to transform your
            beauty routine into an extraordinary experience. From rejuvenating
            facials to relaxing massages, we are here to help you discover your
            most radiant self.
          </p>
        </div>

        {/* Services List */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {serviceCategories.map((category) => (
              <div key={category.id} className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors duration-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.services.map((service) => (
                      <div
                        key={service.name}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 pr-4">
                            {service.name}
                          </h4>
                          <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                            {typeof service.price === "number"
                              ? `R${service.price}`
                              : service.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 max-w-7xl container mx-auto">
          <div className="bg-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Transform Your Beauty?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Book your appointment today and experience the RaizN difference.
              Our expert technicians are ready to help you look and feel your
              absolute best.
            </p>
            <p className="text-green-100 mb-6 text-sm">
              Message us on WhatsApp for appointments and queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* <Link 
                href="/"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-200"
              >
                Book Online Now
              </Link> */}
              <a
                href="https://wa.me/+27827301151"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition-colors duration-200 flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
      <WhatsAppWidget />
    </div>
  );
}
