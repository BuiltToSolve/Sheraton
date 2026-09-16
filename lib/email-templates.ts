export function getOtpEmailTemplate(otp: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #1a365d; margin: 0;">Samrat Sheraton</h2>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #334155; margin-top: 0;">Verify Your Email Address</h3>
        <p style="color: #475569; line-height: 1.6;">
          Please use the following One-Time Password (OTP) to complete your login or registration. This code is valid for 10 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #b49157; background: #fff; padding: 10px 20px; border-radius: 5px; border: 1px dashed #cbd5e1;">
            ${otp}
          </span>
        </div>
        <p style="color: #475569; font-size: 14px; text-align: center;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} Samrat Sheraton. All rights reserved.</p>
        <p>Manduadih, Industrial estate road, Shivdaspur, Varanasi</p>
      </div>
    </div>
  `;
}

// Future template for promotional emails
export function getPromotionalEmailTemplate(title: string, content: string, ctaLink: string, ctaText: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #1a365d; margin: 0;">Samrat Sheraton</h2>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #334155; margin-top: 0;">${title}</h3>
        <div style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
          ${content}
        </div>
        <div style="text-align: center;">
          <a href="${ctaLink}" style="display: inline-block; background-color: #b49157; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold;">
            ${ctaText}
          </a>
        </div>
      </div>
      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} Samrat Sheraton. All rights reserved.</p>
        <p>Manduadih, Industrial estate road, Shivdaspur, Varanasi</p>
        <p><a href="#" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a></p>
      </div>
    </div>
  `;
}

export function getBookingConfirmationEmailTemplate(data: {
  bookingNumber: string;
  primaryGuestName: string;
  guestNames: string[];
  checkIn: string;
  checkOut: string;
  roomsCount: number;
  totalAmount: number;
}) {
  const guestsListHtml = data.guestNames.map(name => `<li style="margin-bottom: 4px;">${name}</li>`).join('');
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #1a365d; margin: 0;">Hotel Samrat Sheraton</h2>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #334155; margin-top: 0;">Booking Confirmed!</h3>
        <p style="color: #475569; line-height: 1.6;">
          Dear ${data.primaryGuestName},<br/><br/>
          Thank you for choosing Hotel Samrat Sheraton. Your reservation has been successfully confirmed. Below are your booking details:
        </p>
        <div style="background-color: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${data.bookingNumber}</p>
          <p style="margin: 5px 0;"><strong>Check-in:</strong> ${data.checkIn}</p>
          <p style="margin: 5px 0;"><strong>Check-out:</strong> ${data.checkOut}</p>
          <p style="margin: 5px 0;"><strong>Rooms:</strong> ${data.roomsCount}</p>
          <div style="margin: 15px 0;">
            <strong style="color: #334155;">Guest List:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #475569;">
              ${guestsListHtml}
            </ul>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
          <p style="margin: 5px 0; font-size: 18px; color: #1a365d;"><strong>Total Amount:</strong> Rs. ${data.totalAmount.toFixed(2)}</p>
        </div>
        <p style="color: #475569; font-size: 14px; margin-top: 20px;">
          We look forward to hosting you! If you have any questions, feel free to reply to this email.
        </p>
      </div>
      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} Hotel Samrat Sheraton. All rights reserved.</p>
        <p>Manduadih, Industrial estate road, Shivdaspur, Varanasi</p>
      </div>
    </div>
  `;
}
