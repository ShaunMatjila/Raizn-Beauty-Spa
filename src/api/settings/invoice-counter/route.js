// app/api/settings/invoice-counter/route.js
import { NextResponse } from "next/server";
import { invoiceService } from "../../../../lib/firestore";

export async function GET() {
  try {
    const nextNumber = await invoiceService.getNextInvoiceNumber();
    return NextResponse.json({
      success: true,
      nextInvoiceNumber: nextNumber,
      formattedNumber: invoiceService.formatInvoiceNumber(nextNumber)
    });
  } catch (error) {
    console.error("Error getting invoice counter:", error);
    return NextResponse.json(
      { error: "Failed to get invoice counter" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { startNumber = 1 } = body;
    
    // This will initialize the counter if it doesn't exist
    const currentNumber = await invoiceService.incrementInvoiceNumber();
    
    return NextResponse.json({
      success: true,
      message: "Invoice counter initialized",
      currentInvoiceNumber: currentNumber,
      formattedNumber: invoiceService.formatInvoiceNumber(currentNumber)
    });
  } catch (error) {
    console.error("Error initializing invoice counter:", error);
    return NextResponse.json(
      { error: "Failed to initialize invoice counter" },
      { status: 500 }
    );
  }
}
