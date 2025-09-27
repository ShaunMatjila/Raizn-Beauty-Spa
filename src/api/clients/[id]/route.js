// app/api/clients/[id]/route.js
import { NextResponse } from "next/server";
import { customerService } from "../../../../lib/firestore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await customerService.getById(id);

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, notes } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const updateData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      notes: notes?.trim() || "",
    };

    const result = await customerService.update(id, updateData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Client updated successfully",
        data: result.data,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await customerService.delete(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Client deleted successfully",
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
