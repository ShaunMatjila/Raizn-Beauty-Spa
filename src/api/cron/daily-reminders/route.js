// app/api/cron/daily-reminders/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  // Verify the request is from a legitimate cron service
  const authHeader = request.headers.get("authorization");

  // You can set a secret in your environment variables
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Call the reminders endpoint
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/reminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Daily reminders processed",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process daily reminders",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
