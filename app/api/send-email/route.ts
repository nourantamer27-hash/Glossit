import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      firstName,
      lastName,
      address,
      area,
      city,
      state,
      zip,
      items,
      subtotal,
      discount,
      deliveryFee,
      finalTotal,
      couponApplied,
    } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !address || !area) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Build email HTML content
    const itemsHTML = items
      .map(
        (item: any) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
              <img src="${item.image}" alt="${item.productName}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;" />
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
              <strong>${item.productName}</strong><br/>
              <span style="color: #999; font-size: 12px;">${item.shadeName}</span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: center;">
              ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right;">
              ${(item.price * item.quantity).toFixed(0)} EGP
            </td>
          </tr>`
      )
      .join("")

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #f4b8c1; }
    .logo { height: 50px; margin-bottom: 10px; }
    .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; }
    .section h2 { color: #b43c64; font-size: 18px; margin-top: 0; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; }
    .info-item { }
    .info-label { color: #999; font-size: 12px; text-transform: uppercase; }
    .info-value { font-weight: 500; color: #333; }
    table { width: 100%; border-collapse: collapse; }
    .summary { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
    .summary-total { font-weight: bold; font-size: 18px; color: #b43c64; padding-top: 10px; border-top: 1px solid #ddd; }
    .discount { color: #4caf50; }
    .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="section header">
      <h1 style="color: #b43c64; margin: 0;">Glossit Order Confirmation</h1>
      <p style="color: #999; margin: 5px 0 0 0;">Thank you for your order!</p>
    </div>

    <div class="section">
      <h2>Customer Information</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Name</div>
          <div class="info-value">${firstName} ${lastName}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${email}</div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Address</div>
          <div class="info-value">${address}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Area</div>
          <div class="info-value">${area}</div>
        </div>
      </div>
      ${city ? `<div class="info-item"><div class="info-label">City</div><div class="info-value">${city}</div></div>` : ""}
    </div>

    <div class="section">
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="padding: 12px; text-align: left;">Image</th>
            <th style="padding: 12px; text-align: left;">Product</th>
            <th style="padding: 12px; text-align: center;">Qty</th>
            <th style="padding: 12px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${subtotal} EGP</span>
        </div>
        ${discount > 0 ? `<div class="summary-row discount"><span>Discount (5%)</span><span>-${discount.toFixed(0)} EGP</span></div>` : ""}
        <div class="summary-row">
          <span>Delivery</span>
          <span>${deliveryFee === 0 ? "Free" : `${deliveryFee} EGP`}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>${finalTotal.toFixed(0)} EGP</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Payment Method</h2>
      <p style="margin: 0;"><strong>Cash on Delivery</strong></p>
      <p style="margin: 5px 0 0 0; color: #999; font-size: 14px;">Pay when your order arrives at your doorstep</p>
    </div>

    <div class="footer">
      <p>Thank you for shopping with Glossit! We&apos;re excited to get your order to you.</p>
      <p>&copy; ${new Date().getFullYear()} Glossit. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim()

    if (!process.env.RESEND_API_KEY) {
      console.warn("[v0] RESEND_API_KEY not configured. Set RESEND_API_KEY environment variable.")
      console.log("[v0] Email would be sent to:", email)
      console.log("[v0] Order details:", body)

      return NextResponse.json(
        {
          success: true,
          message: "Order confirmation email logged (Resend API key not configured)",
        },
        { status: 200 }
      )
    }

    // Send email via Resend
    const response = await resend.emails.send({
  from: "Glossit <onboarding@resend.dev>",
  to: email,
  cc: "nourantamer27@gmail.com",
  subject: "Glossit Order Confirmation",
  html: emailHTML,
})

    if (response.error) {
      console.error("[v0] Resend error:", response.error)
      return NextResponse.json(
        { error: "Failed to send email", details: response.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully", messageId: response.data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Error sending email:", error)

    return NextResponse.json(
      { error: "Failed to send email", details: String(error) },
      { status: 500 }
    )
  }
}
