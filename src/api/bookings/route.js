// app/api/bookings/route.js
import { NextResponse } from "next/server";
import { bookingService, customerService } from "../../../lib/firestore";
import { doc, updateDoc, increment, Timestamp, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import {
  sendBookingConfirmation,
  sendAdminNotification,
} from "../../../lib/email";

export async function GET() {
  try {
    const result = await bookingService.getAll();

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerData, bookingData } = body;

    // Validate required fields
    if (!customerData?.name || !customerData?.email || !customerData?.phone) {
      return NextResponse.json(
        { error: "Customer information is required" },
        { status: 400 }
      );
    }

    if (!bookingData?.service || !bookingData?.date || !bookingData?.time) {
      return NextResponse.json(
        { error: "Booking information is required" },
        { status: 400 }
      );
    }

    // Create or update customer
    const customerResult = await customerService.createOrUpdate(customerData);
    if (!customerResult.success) {
      return NextResponse.json(
        { error: "Failed to save customer information" },
        { status: 500 }
      );
    }

    // Create booking
    const completeBookingData = {
      ...bookingData,
      customerId: customerResult.id,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      date: new Date(bookingData.date),
    };

    const bookingResult = await bookingService.create(completeBookingData);

    if (bookingResult.success) {
      // Update service booking count
      try {
        // Find the service document by title to update booking count
        if (bookingData.service) {
          console.log(`Looking for service: "${bookingData.service}"`);
          
          const servicesQuery = query(
            collection(db, "services"),
            where("title", "==", bookingData.service)
          );
          const servicesSnapshot = await getDocs(servicesQuery);
          
          if (!servicesSnapshot.empty) {
            const serviceDoc = servicesSnapshot.docs[0];
            console.log(`Found service document: ${serviceDoc.id}`);
            
            await updateDoc(serviceDoc.ref, {
              bookings: increment(1),
              updatedAt: Timestamp.now(),
            });
            console.log(
              `Successfully incremented booking count for service: ${bookingData.service}`
            );
          } else {
            console.warn(
              `Service document not found for: "${bookingData.service}". This might happen if the service hasn't been seeded yet.`
            );
            
            // Try to find by name field as well (fallback)
            const nameQuery = query(
              collection(db, "services"),
              where("name", "==", bookingData.service)
            );
            const nameSnapshot = await getDocs(nameQuery);
            
            if (!nameSnapshot.empty) {
              const serviceDoc = nameSnapshot.docs[0];
              console.log(`Found service by name field: ${serviceDoc.id}`);
              
              await updateDoc(serviceDoc.ref, {
                bookings: increment(1),
                updatedAt: Timestamp.now(),
              });
              console.log(
                `Successfully incremented booking count for service (by name): ${bookingData.service}`
              );
            } else {
              console.warn(
                `Service not found by name either: "${bookingData.service}". Consider seeding the services database.`
              );
            }
          }
        }
      } catch (serviceUpdateError) {
        console.warn(
          "Failed to update service booking count:",
          serviceUpdateError
        );
        // Don't fail the booking if service update fails
      }
      // Send confirmation emails
      const emailData = {
        id: bookingResult.id,
        invoiceNumber: bookingResult.invoiceNumber,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        service: bookingData.service,
        date: new Date(bookingData.date).toLocaleDateString(),
        time: bookingData.time,
        duration: bookingData.duration || "60 minutes",
        price: bookingData.price || "TBD",
      };

      // Send booking confirmation to customer
      await sendBookingConfirmation(emailData);

      // Send notification to admin
      await sendAdminNotification(emailData);

      return NextResponse.json({
        success: true,
        bookingId: bookingResult.id,
        message: "Booking created successfully",
      });
    } else {
      return NextResponse.json({ error: bookingResult.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
