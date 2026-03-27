import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, company, phone, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #193c69; border-bottom: 2px solid #193c69; padding-bottom: 10px;">
          Шинэ холбоо барих мессеж
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 120px;">Нэр:</td>
            <td style="padding: 8px 12px;">${name}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Имэйл:</td>
            <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${company ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #555;">Байгууллага:</td><td style="padding: 8px 12px;">${company}</td></tr>` : ""}
          ${phone ? `<tr style="background: #f9f9f9;"><td style="padding: 8px 12px; font-weight: bold; color: #555;">Утас:</td><td style="padding: 8px 12px;">${phone}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Гарчиг:</td>
            <td style="padding: 8px 12px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Мессеж:</h3>
          <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          Энэ мессеж FIBA LLC вэбсайтын холбоо барих хэсгээс илгээгдсэн.
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FIBA Website <onboarding@resend.dev>",
        to: ["contact@fiba.mn"],
        subject: `[FIBA.mn] ${subject} - ${name}`,
        html: htmlContent,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: data }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
