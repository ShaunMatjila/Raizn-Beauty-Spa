// app/api/bookings/[id]/route.js
import { NextResponse } from "next/server";
import { bookingService } from "../../../../lib/firestore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await bookingService.getById(id);

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const result = await bookingService.updateStatus(id, status);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Booking status updated successfully",
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await bookingService.delete(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Booking deleted successfully",
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
