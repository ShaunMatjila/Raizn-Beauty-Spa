// app/api/appointments/today/route.js
import { NextResponse } from "next/server";
import { bookingService } from "../../../../lib/firestore";

export async function GET() {
  try {
    const result = await bookingService.getToday();

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's appointments" },
      { status: 500 }
    );
  }
}
