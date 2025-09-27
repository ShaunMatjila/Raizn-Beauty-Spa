// app/api/analytics/route.js
import { NextResponse } from "next/server";
import { analyticsService } from "../../../lib/firestore";

export async function GET() {
  try {
    const result = await analyticsService.getBookingStats();

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
