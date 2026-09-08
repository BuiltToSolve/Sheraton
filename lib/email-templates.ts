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
