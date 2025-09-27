// app/api/reminders/route.js
import { NextResponse } from "next/server";
import { sendBookingReminder } from "../../../lib/email";
import { db } from "../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export async function POST(request) {
  try {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    dayAfterTomorrow.setHours(0, 0, 0, 0);

    console.log("Looking for bookings for:", tomorrow.toDateString());

    // Query bookings for tomorrow
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("date", ">=", Timestamp.fromDate(tomorrow)),
      where("date", "<", Timestamp.fromDate(dayAfterTomorrow)),
      where("status", "==", "confirmed") // Only send reminders for confirmed bookings
    );

    const querySnapshot = await getDocs(q);
    const bookings = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        date: data.date.toDate(), // Convert Firestore Timestamp to Date
      });
    });

    console.log(`Found ${bookings.length} bookings for tomorrow`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Send reminder emails
    for (const booking of bookings) {
      try {
        // Format the booking data for the email template
        const emailData = {
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          service: booking.serviceName || booking.service,
          time: booking.time,
          duration: booking.duration ? `${booking.duration} minutes` : "TBD",
          date: booking.date.toLocaleDateString("en-ZA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };

        const result = await sendBookingReminder(emailData);

        if (result.success) {
          successCount++;
          console.log(`Reminder sent to ${booking.customerEmail}`);
        } else {
          errorCount++;
          errors.push(
            `Failed to send to ${booking.customerEmail}: ${result.error}`
          );
        }
      } catch (error) {
        errorCount++;
        errors.push(`Error processing booking ${booking.id}: ${error.message}`);
        console.error(
          `Error sending reminder for booking ${booking.id}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reminder process completed. Sent: ${successCount}, Failed: ${errorCount}`,
      stats: {
        totalBookings: bookings.length,
        successCount,
        errorCount,
        errors: errors.slice(0, 10), // Limit errors in response
      },
    });
  } catch (error) {
    console.error("Error in reminder system:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process reminders",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET method for testing/manual trigger
export async function GET() {
  // For security, you might want to add authentication here
  return POST();
}
