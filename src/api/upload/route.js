import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    console.log("Upload API called");

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        {
          success: false,
          error: "File size too large. Maximum size is 5MB.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `services/${uuidv4()}.${fileExtension}`;

    console.log("Generated filename:", fileName);

    // Create storage reference
    const storageRef = ref(storage, fileName);

    console.log("Uploading to Firebase Storage...");

    // Upload file to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    console.log("Upload successful, getting download URL...");

    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);

    console.log("Download URL obtained:", downloadURL);

    const response = {
      success: true,
      url: downloadURL,
      filename: fileName,
      path: uploadResult.ref.fullPath,
    };

    console.log("Returning response:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload error details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Upload failed: " + error.message,
      },
      { status: 500 }
    );
  }
}

// Handle file deletion
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        {
          success: false,
          error: "No file path provided",
        },
        { status: 400 }
      );
    }

    // Security check - only allow deletion of files in services folder
    if (!filePath.startsWith("services/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file path",
        },
        { status: 400 }
      );
    }

    try {
      // Create storage reference
      const storageRef = ref(storage, filePath);

      // Delete file from Firebase Storage
      await deleteObject(storageRef);

      return NextResponse.json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        return NextResponse.json({
          success: true,
          message: "File not found (already deleted)",
        });
      }
      throw error;
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Delete failed: " + error.message,
      },
      { status: 500 }
    );
  }
}
