// app/api/clients/route.js
import { NextResponse } from "next/server";
import { customerService, bookingService } from "../../../lib/firestore";
import { sendEmail } from "../../../lib/email";

export async function GET() {
  try {
    const customersResult = await customerService.getAll();

    if (customersResult.success) {
      // Get all bookings to match with customers
      const bookingsResult = await bookingService.getAll();

      if (bookingsResult.success) {
        // Add appointment counts and last appointment to each customer
        const clientsWithHistory = customersResult.data.map((customer) => {
          const customerBookings = bookingsResult.data.filter(
            (booking) => booking.customerId === customer.id
          );

          const completedBookings = customerBookings.filter(
            (booking) => booking.status === "completed"
          );

          const lastBooking =
            customerBookings.length > 0
              ? customerBookings.reduce((latest, booking) => {
                  return new Date(booking.date) > new Date(latest.date)
                    ? booking
                    : latest;
                })
              : null;

          const totalSpent = completedBookings.reduce((sum, booking) => {
            const price = parseFloat(
              booking.price?.replace(/[^0-9.-]/g, "") || 0
            );
            return sum + price;
          }, 0);

          return {
            ...customer,
            totalAppointments: customerBookings.length,
            completedAppointments: completedBookings.length,
            pendingAppointments: customerBookings.filter(
              (b) => b.status === "pending"
            ).length,
            confirmedAppointments: customerBookings.filter(
              (b) => b.status === "confirmed"
            ).length,
            cancelledAppointments: customerBookings.filter(
              (b) => b.status === "cancelled"
            ).length,
            lastAppointment: lastBooking,
            totalSpent: totalSpent,
            isActive: customerBookings.some((booking) =>
              ["pending", "confirmed"].includes(booking.status)
            ),
          };
        });

        // Sort by most recent activity
        clientsWithHistory.sort((a, b) => {
          if (!a.lastAppointment && !b.lastAppointment) return 0;
          if (!a.lastAppointment) return 1;
          if (!b.lastAppointment) return -1;
          return (
            new Date(b.lastAppointment.date) - new Date(a.lastAppointment.date)
          );
        });

        return NextResponse.json({
          success: true,
          data: clientsWithHistory,
        });
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, notes, sendWelcomeEmail } = body;

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

    // Check if client with this email already exists
    const existingClientsResult = await customerService.getAll();
    if (existingClientsResult.success) {
      const existingClient = existingClientsResult.data.find(
        (client) => client.email?.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingClient) {
        return NextResponse.json(
          { error: "A client with this email address already exists" },
          { status: 409 } // Conflict status code
        );
      }
    }

    const customerData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      notes: notes?.trim() || "",
      status: "inactive", // Default status for new clients
    };

    const result = await customerService.createOrUpdate(customerData);

    if (result.success) {
      // Send welcome email if requested
      if (sendWelcomeEmail) {
        try {
          await sendEmail({
            to: customerData.email,
            subject: `Welcome to ${
              process.env.COMPANY_NAME || "Our Beauty Spa"
            }`,
            html: `
              <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9;">
                
                <!-- Company Header -->
                <table style="width: 100%; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; margin-bottom: 20px;">
                  <tr>
                    <td style="width: 60%;">
                      <h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #2c3e50;">
                        ${process.env.COMPANY_NAME || "Beauty Spa"}
                      </h1>
                      <p style="margin: 2px 0; font-size: 12px; color: #7f8c8d;">
                        ${process.env.COMPANY_ADDRESS || "Business Address"}
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
                        ${process.env.COMPANY_PHONE || "Phone Number"} | ${
                        process.env.COMPANY_EMAIL || "Email"
                      }
                      </p>
                    </td>
                    <td style="width: 40%; text-align: right; vertical-align: top;">
                      <h2 style="margin: 0; font-size: 18px; color: #2c3e50;">WELCOME</h2>
                      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">${new Date().toLocaleDateString()}</p>
                    </td>
                  </tr>
                </table>

                <!-- Greeting -->
                <p style="font-size: 15px; margin-bottom: 15px;">
                  Dear ${customerData.name},
                </p>
                <p style="font-size: 14px; margin-bottom: 25px; line-height: 1.5;">
                  We’re delighted to welcome you to ${
                    process.env.COMPANY_NAME || "our spa"
                  }.
                  Your account has been created and you’re now part of our valued client family.
                  Please find your details below for your records.
                </p>

                <!-- Client Details Table -->
                <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e0e0e0; margin-bottom: 25px;">
                  <thead>
                    <tr style="background-color: #2c3e50; color: white; text-align: left;">
                      <th style="padding: 10px; font-size: 13px;">DETAIL</th>
                      <th style="padding: 10px; font-size: 13px;">INFORMATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">Name</td>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${
                        customerData.name
                      }</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">Email</td>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${
                        customerData.email
                      }</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px;">Phone</td>
                      <td style="padding: 10px;">${customerData.phone}</td>
                    </tr>
                  </tbody>
                </table>

                <!-- Closing Note -->
                <p style="font-size: 13px; color: #555; margin-bottom: 40px;">
                  If any of the above details are incorrect, please contact us at 
                  <strong>${process.env.COMPANY_EMAIL || "Email"}</strong> or call 
                  <strong>${process.env.COMPANY_PHONE || "Phone Number"}</strong>.
                </p>

                <!-- Footer -->
                <div style="font-size: 11px; color: #7f8c8d; border-top: 1px solid #e5e5e5; padding-top: 15px; text-align: center;">
                  <p style="margin: 0;">
                    <strong>${process.env.COMPANY_NAME || "Beauty Spa"}</strong> |
                    ${process.env.COMPANY_PHONE || "Phone"} |
                    ${process.env.COMPANY_EMAIL || "Email"} |
                    ${process.env.COMPANY_ADDRESS || "Address"}
                  </p>
                  <p style="margin: 5px 0 0;">
                    This is an automated message. Please do not reply directly.
                  </p>
                </div>
              </div>
            `,
            text: `
              Welcome to ${process.env.COMPANY_NAME || "Our Beauty Spa"}

              Dear ${customerData.name},

              We’re delighted to welcome you to ${
                            process.env.COMPANY_NAME || "our spa"
                          }. Your account has been created and you’re now part of our valued client family.

              Your Details:
              - Name: ${customerData.name}
              - Email: ${customerData.email}
              - Phone: ${customerData.phone}

              If any of the above details are incorrect, please contact us at ${
                            process.env.COMPANY_EMAIL || "Email"
                          } or call ${process.env.COMPANY_PHONE || "Phone Number"}.

              ${process.env.COMPANY_NAME || "Beauty Spa"}
              ${process.env.COMPANY_PHONE || "Phone"} | ${
                            process.env.COMPANY_EMAIL || "Email"
                          }
              ${process.env.COMPANY_ADDRESS || "Address"}
                `,
          });

          // console.log(`Welcome email sent to ${customerData.email}`);
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
        }
      }

      return NextResponse.json({
        success: true,
        clientId: result.id,
        message: "Client created successfully",
        data: result.data,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
