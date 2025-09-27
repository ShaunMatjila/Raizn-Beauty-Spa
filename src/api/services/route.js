// app/api/services/route.js
import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  setDoc,
  writeBatch,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

const COLLECTIONS = {
  SERVICES: "services",
};

// Service data from the services.js file
const serviceCategories = [
  {
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
    title: "Massage & Body Treatments",
    services: [
      {
        title: "Hot Stone Massage",
        name: "Hot Stone Massage",
        description:
          "Heated basalt stones melt away tension while improving circulation and relaxation.",
        image: "/images/stone.webp",
        price: 950,
        duration: 90,
        category: "Massage & Body Treatments",
      },
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "seed-check") {
      // Check if services exist in database
      const q = query(collection(db, COLLECTIONS.SERVICES));
      const querySnapshot = await getDocs(q);

      return NextResponse.json({
        success: true,
        hasData: !querySnapshot.empty,
        count: querySnapshot.size,
      });
    }

    // Get all services from Firestore
    const q = query(
      collection(db, COLLECTIONS.SERVICES),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no services exist, return empty data
      return NextResponse.json({
        success: true,
        data: [],
        message: "No services found - run seed to populate database",
        fromDefaults: false,
        isEmpty: true,
      });
    }

    // Get all bookings to calculate real-time booking counts
    const bookingsQuery = query(collection(db, "bookings"));
    const bookingsSnapshot = await getDocs(bookingsQuery);

    // Create a map to count bookings by service name/title
    const serviceBookingCounts = {};

    bookingsSnapshot.docs.forEach((bookingDoc) => {
      const booking = bookingDoc.data();
      const serviceName = booking.service; // This is the service name/title

      if (serviceName) {
        serviceBookingCounts[serviceName] =
          (serviceBookingCounts[serviceName] || 0) + 1;
      }
    });

    // Group services by category and calculate dynamic stats
    const servicesByCategory = {};

    querySnapshot.forEach((doc) => {
      const serviceData = doc.data();
      const serviceName = serviceData.title || serviceData.name;
      const actualBookingCount = serviceBookingCounts[serviceName] || 0;

      const service = {
        id: doc.id,
        ...serviceData,
        createdAt: serviceData.createdAt?.toDate?.() || serviceData.createdAt,
        updatedAt: serviceData.updatedAt?.toDate?.() || serviceData.updatedAt,
        // Use real-time booking counts
        bookings: actualBookingCount,
        revenue: serviceData.revenue || 0,
        popular: serviceData.popular || false, // This would be calculated: bookings > average
        most_booked: doc.data().most_booked || false, // This would be: highest bookings in category
      };
      const category = service.category || "Other Services";

      if (!servicesByCategory[category]) {
        servicesByCategory[category] = {
          title: category,
          name: category,
          services: [],
        };
      }

      servicesByCategory[category].services.push(service);
    });

    // Calculate dynamic popularity after loading all services
    const allServices = Object.values(servicesByCategory).flatMap(
      (cat) => cat.services
    );
    const averageBookings =
      allServices.reduce((sum, s) => sum + s.bookings, 0) / allServices.length;

    // Update popularity based on bookings
    allServices.forEach((service) => {
      service.popular = service.bookings > averageBookings;
    });

    // Mark most booked service in each category
    Object.values(servicesByCategory).forEach((category) => {
      if (category.services.length > 0) {
        const mostBookedService = category.services.reduce((max, service) =>
          service.bookings > max.bookings ? service : max
        );
        category.services.forEach((service) => {
          service.most_booked = service.id === mostBookedService.id;
        });
      }
    });

    // Convert to array format matching the original structure
    const formattedData = Object.values(servicesByCategory);

    return NextResponse.json({
      success: true,
      data: formattedData,
      fromDatabase: true,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, serviceData } = body;

    if (action === "seed") {
      // Seed the database with initial service data
      const batch = writeBatch(db);

      for (const category of serviceCategories) {
        for (const service of category.services) {
          const serviceRef = doc(collection(db, COLLECTIONS.SERVICES));
          batch.set(serviceRef, {
            ...service,
            id: serviceRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            active: true,
            // Initialize dynamic stats to 0 - these will be calculated from actual bookings
            bookings: 0,
            revenue: 0,
            popular: false,
            most_booked: false,
          });
        }
      }

      await batch.commit();

      // Count total services for the response
      const totalServices = serviceCategories.reduce(
        (total, category) => total + category.services.length,
        0
      );

      return NextResponse.json({
        success: true,
        message: `Successfully seeded ${totalServices} services to the database. Booking stats will be calculated dynamically based on actual appointments.`,
      });
    } else if (action === "add") {
      // Add a new service
      const serviceRef = doc(collection(db, COLLECTIONS.SERVICES));
      await setDoc(serviceRef, {
        ...serviceData,
        id: serviceRef.id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        active: true,
        bookings: serviceData.bookings || 0,
        revenue: serviceData.revenue || 0,
      });

      return NextResponse.json({
        success: true,
        message: "Service added successfully",
        data: { id: serviceRef.id, ...serviceData },
      });
    } else {
      // Original service creation logic
      const {
        title,
        description,
        price,
        duration,
        category,
        image,
        bookable = true,
      } = body;

      // Validate required fields
      if (!title || !description || !price || !category) {
        return NextResponse.json(
          { error: "Title, description, price, and category are required" },
          { status: 400 }
        );
      }

      const newServiceData = {
        title: title.trim(),
        name: title.trim(),
        description: description.trim(),
        price: typeof price === "string" ? price.trim() : price,
        duration:
          typeof duration === "string" ? duration.trim() : duration || 60,
        category: category.trim(),
        image: image?.trim() || null,
        bookable,
        // Initialize dynamic stats - these will be calculated from actual appointments
        popular: false,
        most_booked: false,
        bookings: 0,
        revenue: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        active: true,
      };

      const docRef = await addDoc(
        collection(db, COLLECTIONS.SERVICES),
        newServiceData
      );

      return NextResponse.json({
        success: true,
        serviceId: docRef.id,
        message: "Service created successfully",
        data: newServiceData,
      });
    }
  } catch (error) {
    console.error("Error in POST /api/services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      price,
      duration,
      category,
      image,
      bookable,
    } = body;

    // Validate required fields
    if (!id || !title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "ID, title, description, and category are required",
        },
        { status: 400 }
      );
    }

    // Update the service in the services collection
    const docRef = doc(db, COLLECTIONS.SERVICES, id);

    const updateData = {
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      price: typeof price === "string" ? parseInt(price.trim()) : price,
      duration:
        typeof duration === "string"
          ? parseInt(duration.trim())
          : duration || 60,
      category: category.trim(),
              image: image?.trim() || null,
      bookable,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error in PUT /api/services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Service ID is required" },
        { status: 400 }
      );
    }

    // Delete the service from the services collection
    const docRef = doc(db, COLLECTIONS.SERVICES, id);
    await deleteDoc(docRef);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /api/services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
