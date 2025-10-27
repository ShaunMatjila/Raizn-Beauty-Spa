"use client";

export default function ContactUs() {
  const contactInfo = {
    Address: {
      value: "170 Roux Street, Danville, Pretoria West",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    Phone: {
      value: "082 730 1151",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    Email: {
      value: "info@raizncosmetic.co.za",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  };

  const workingHours = {
    Monday: "9:00 AM – 6:00 PM",
    Tuesday: "9:00 AM – 6:00 PM",
    Wednesday: "9:00 AM – 6:00 PM",
    Thursday: "9:00 AM – 6:00 PM",
    Friday: "9:00 AM – 8:00 PM",
    Saturday: "10:00 AM – 4:00 PM",
    Sunday: "10:00 AM – 4:00 PM",
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-primary/5"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Get <span className="text-primary">In Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            Ready to experience luxury beauty treatments? Visit us in Danville
            or call to book your appointment with our expert team.
          </p>
        </div>

        {/* Two Column Layout for Working Hours and Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left Column - Working Hours */}
          <div className="space-y-8">
            {/* Working Hours */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
                Operating Hours
              </h3>
              <ul className="space-y-2">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between text-gray-600">
                    <span className="font-bold">{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-4">
                <span className="font-bold">Walk-ins welcome:</span>{" "}
                Appointments recommended for premium services.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              {Object.entries(contactInfo).map(([type, info]) => (
                <div key={type} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{type}</h4>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section Below */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Find Us on Map
          </h3>
          <p className="text-gray-600 mb-4">
            Click the marker to get directions.
          </p>
          <div className="rounded-xl overflow-hidden shadow-lg h-[300px] sm:h-[500px]">
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=170%20Roux%20Street,%20Danville,%20Pretoria%20West,%20South%20Africa&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RaizN Cosmetic Boutique Location"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
