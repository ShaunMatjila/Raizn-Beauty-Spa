import { NextResponse } from "next/server";
import { sendCompletionThankYou } from "../../../../lib/email";

export async function POST(request) {
  try {
    const { appointment } = await request.json();

    // Validate required fields
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: "Appointment data is required" },
        { status: 400 }
      );
    }

    if (!appointment.customerEmail && !appointment.clientEmail) {
      return NextResponse.json(
        { success: false, error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Send thank you email
    const result = await sendCompletionThankYou(appointment);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Thank you email sent successfully",
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending thank you email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send thank you email" },
      { status: 500 }
    );
  }
}
