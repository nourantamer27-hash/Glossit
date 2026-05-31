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
    const itemsHTML = (items || [])
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
    .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; }
    .summary { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-total { font-weight: bold; font-size: 18px; color: #b43c64; border-top: 1px solid #ddd; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">

    <div class="section header">
      <h1 style="color: #b43c64;">Glossit Order Confirmation</h1>
      <p>Thank you for your order!</p>
    </div>

    <div class="section">
      <h2>Customer Information</h2>
      <p><strong>${firstName} ${lastName}</strong></p>
      <p>${email}</p>
      <p>${address}, ${area}</p>
      ${city ? `<p>${city}</p>` : ""}
    </div>

    <div class="section">
      <h2>Order Details</h2>
      <table width="100%">
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${subtotal} EGP</span>
        </div>

        ${
          discount > 0
            ? `<div class="summary-row">
                <span>Discount</span>
                <span>-${discount.toFixed(0)} EGP</span>
              </div>`
            : ""
        }

        <div class="summary-row">
          <span>Delivery</span>
          <span>${deliveryFee === 0 ? "Free" : deliveryFee + " EGP"}</span>
        </div>

        <div class="summary-row summary-total">
          <span>Total</span>
          <span>${finalTotal.toFixed(0)} EGP</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Payment Method</h2>
      <p><strong>Cash on Delivery</strong></p>
    </div>

  </div>
</body>
</html>
    `.trim()

    if (!process.env.RESEND_API_KEY) {
      console.warn("Missing RESEND_API_KEY")

      return NextResponse.json(
        {
          success: true,
          message: "Order placed but email not configured",
        },
        { status: 200 }
      )
    }

    try {
      await resend.emails.send({
        from: "Glossit <onboarding@resend.dev>",
        to: email,
        subject: "Glossit Order Confirmation",
        html: emailHTML,
      })

      await resend.emails.send({
        from: "Glossit <onboarding@resend.dev>",
        to: "nourantamer27@gmail.com",
        subject: "🛒 New Order Received - Glossit",
        html: emailHTML,
      })
    } catch (error) {
      console.error("[v0] Email failed but order continues:", error)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
