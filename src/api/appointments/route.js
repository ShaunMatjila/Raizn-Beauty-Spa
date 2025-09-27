// app/api/appointments/route.js
import { NextResponse } from "next/server";
import { bookingService, customerService } from "../../../lib/firestore";
import {
  sendBookingConfirmation,
  sendAdminNotification,
} from "../../../lib/email";

// GET - Fetch all appointments
export async function GET() {
  try {
    const result = await bookingService.getAll();

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    const { bookingData, customerData } = await request.json();

    // Validate required fields
    if (
      !bookingData?.service ||
      !bookingData?.date ||
      !bookingData?.time ||
      !customerData?.name ||
      !customerData?.email ||
      !customerData?.phone
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or update customer
    const customerResult = await customerService.createOrUpdate({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
    });

    if (!customerResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to create customer" },
        { status: 500 }
      );
    }

    // Create appointment
    const appointmentData = {
      ...bookingData,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      customerId: customerResult.id,
      status: "pending", // Ensure status is set
    };

    console.log("Creating appointment with data:", appointmentData);
    const bookingResult = await bookingService.create(appointmentData);

    if (bookingResult.success) {
      // Send confirmation email to customer
      try {
        await sendBookingConfirmation({
          id: bookingResult.id,
          invoiceNumber: bookingResult.invoiceNumber,
          customerName: customerData.name,
          customerEmail: customerData.email,
          service: bookingData.service,
          date: new Date(bookingData.date).toLocaleDateString(),
          time: bookingData.time,
          duration: bookingData.duration || "60 minutes",
          price: bookingData.price || "TBD",
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the appointment creation if email fails
      }

      // Send notification to admin
      try {
        await sendAdminNotification({
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
        });
      } catch (emailError) {
        console.error("Error sending admin notification:", emailError);
        // Don't fail the appointment creation if email fails
      }

      return NextResponse.json({
        success: true,
        data: bookingResult.data,
        id: bookingResult.id,
      });
    } else {
      return NextResponse.json(
        { success: false, error: bookingResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
