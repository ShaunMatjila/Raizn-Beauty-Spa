// app/api/appointments/[id]/route.js
import { NextResponse } from "next/server";
import { bookingService } from "../../../../lib/firestore";
import { sendBookingConfirmation } from "../../../../lib/email";

// GET - Fetch specific appointment
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await bookingService.getById(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error === "Booking not found" ? 404 : 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

// PUT - Update appointment
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    // Get current appointment data first
    const currentResult = await bookingService.getById(id);
    if (!currentResult.success) {
      return NextResponse.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Update appointment
    const result = await bookingService.update(id, updateData);

    if (result.success) {
      // If status was changed to confirmed, send confirmation email
      if (
        updateData.status === "confirmed" &&
        currentResult.data.status !== "confirmed"
      ) {
        try {
          await sendBookingConfirmation({
            customerName: currentResult.data.customerName,
            customerEmail: currentResult.data.customerEmail,
            service: currentResult.data.service,
            date: new Date(currentResult.data.date).toLocaleDateString(),
            time: currentResult.data.time,
            duration: currentResult.data.duration || "60 minutes",
            price: currentResult.data.price || "TBD",
          });
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      }

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
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete appointment
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await bookingService.delete(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Appointment deleted successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
