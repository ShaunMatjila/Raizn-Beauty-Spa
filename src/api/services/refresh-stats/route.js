// app/api/services/refresh-stats/route.js
import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

const COLLECTIONS = {
  SERVICES: "services",
  BOOKINGS: "bookings", // Assuming this is how bookings are stored
};

export async function POST(request) {
  try {
    console.log("Starting service booking stats refresh...");

    // Get all services
    const servicesQuery = query(collection(db, COLLECTIONS.SERVICES));
    const servicesSnapshot = await getDocs(servicesQuery);

    if (servicesSnapshot.empty) {
      return NextResponse.json({
        success: false,
        message: "No services found",
      });
    }

    // Get all bookings first
    const bookingsQuery = query(collection(db, COLLECTIONS.BOOKINGS));
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

    let updatedCount = 0;
    const serviceUpdates = [];

    // For each service, update with the actual booking count
    for (const serviceDoc of servicesSnapshot.docs) {
      const serviceId = serviceDoc.id;
      const serviceData = serviceDoc.data();
      const serviceName = serviceData.title || serviceData.name;

      try {
        // Get the actual booking count for this service
        const actualBookingCount = serviceBookingCounts[serviceName] || 0;

        // Update service with actual booking count
        const serviceRef = doc(db, COLLECTIONS.SERVICES, serviceId);
        await updateDoc(serviceRef, {
          bookings: actualBookingCount,
          updatedAt: Timestamp.now(),
        });

        serviceUpdates.push({
          serviceId,
          serviceName: serviceName,
          previousCount: serviceData.bookings || 0,
          actualCount: actualBookingCount,
        });

        updatedCount++;
      } catch (error) {
        console.error(`Error updating service ${serviceId}:`, error);
      }
    }

    console.log(`Successfully updated ${updatedCount} services`);
    console.log("Service booking counts:", serviceBookingCounts);

    return NextResponse.json({
      success: true,
      message: `Successfully refreshed booking statistics for ${updatedCount} services`,
      updatedServices: serviceUpdates,
      totalServicesProcessed: updatedCount,
      bookingCounts: serviceBookingCounts,
    });
  } catch (error) {
    console.error("Error refreshing service booking stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh service booking statistics",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
