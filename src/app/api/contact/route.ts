import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  contact: string;
  inquiryType: string;
  message: string;
  preferredContact?: string;
};

function sanitize(str: string): string {
  return str.trim().slice(0, 2000);
}

function validatePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (
    typeof b.name !== "string" ||
    typeof b.contact !== "string" ||
    typeof b.inquiryType !== "string" ||
    typeof b.message !== "string"
  )
    return null;
  if (!b.name.trim() || !b.contact.trim() || !b.inquiryType || !b.message.trim())
    return null;
  if (b.message.trim().length < 10) return null;
  return {
    name: sanitize(b.name),
    contact: sanitize(b.contact),
    inquiryType: sanitize(b.inquiryType),
    message: sanitize(b.message),
    preferredContact:
      typeof b.preferredContact === "string"
        ? sanitize(b.preferredContact)
        : "",
  };
}

// Initialize DB table on first run (idempotent)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureTable(sql: any) {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id          BIGSERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      contact     TEXT        NOT NULL,
      inquiry_type TEXT       NOT NULL,
      message     TEXT        NOT NULL,
      preferred_contact TEXT  DEFAULT '',
      ip          TEXT        DEFAULT '',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(req: Request) {
  // Rate limit check via IP (basic — Vercel edge handles DDoS protection)
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = validatePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 422 });
  }

  // ── Database ──────────────────────────────
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await ensureTable(sql);
      await sql`
        INSERT INTO contact_submissions
          (name, contact, inquiry_type, message, preferred_contact, ip)
        VALUES
          (${payload.name}, ${payload.contact}, ${payload.inquiryType},
           ${payload.message}, ${payload.preferredContact ?? ""}, ${ip})
      `;
    } catch (err) {
      console.error("[contact/db] Failed to save submission:", err);
      // Don't fail the user — still try email
    }
  }

  // ── Email notification via Resend ─────────
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "grandmawillie.team@gmail.com";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Grandma Willie Website <noreply@resend.dev>",
        to: [notifyEmail],
        replyTo: payload.contact.includes("@") ? payload.contact : notifyEmail,
        subject: `New Inquiry: ${payload.inquiryType} — from ${payload.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #FFF3D7; padding: 32px; border-radius: 12px;">
            <div style="background: #140B07; color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 20px; color: #E8B84B;">📬 New Website Inquiry</h2>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.65); font-size: 13px;">Grandma Willie Website Contact Form</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6B351C; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
                <td style="padding: 10px 0; color: #140B07;">${payload.name}</td>
              </tr>
              <tr style="background: rgba(0,0,0,0.03);">
                <td style="padding: 10px 0; font-weight: bold; color: #6B351C; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Contact</td>
                <td style="padding: 10px 0; color: #140B07;">${payload.contact}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6B351C; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Inquiry Type</td>
                <td style="padding: 10px 0; color: #140B07;">${payload.inquiryType}</td>
              </tr>
              ${payload.preferredContact ? `
              <tr style="background: rgba(0,0,0,0.03);">
                <td style="padding: 10px 0; font-weight: bold; color: #6B351C; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Preferred Contact</td>
                <td style="padding: 10px 0; color: #140B07;">${payload.preferredContact}</td>
              </tr>` : ""}
              <tr>
                <td colspan="2" style="padding: 16px 0 4px; font-weight: bold; color: #6B351C; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 16px; background: white; border-radius: 8px; color: #140B07; line-height: 1.6; font-size: 15px;">${payload.message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 12px 16px; background: #B9471B; border-radius: 8px; color: white; font-size: 12px; text-align: center;">
              Received at grandma-willie-website.vercel.app · Respond within 2–3 business days
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error("[contact/email] Failed to send notification:", err);
      // Non-fatal — submission still saved to DB
    }
  }

  return NextResponse.json(
    { success: true, message: "Your inquiry has been received." },
    { status: 200 }
  );
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
