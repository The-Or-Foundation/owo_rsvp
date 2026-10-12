import { NextResponse } from "next/server";

// RSVPs are saved to a Google Sheet through its Apps Script web app
// (scripts/rsvp-google-sheet.gs). Both values are set in Netlify.
const sheetUrl = process.env.RSVP_SHEET_URL;
const sheetSecret = process.env.RSVP_SHEET_SECRET;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!sheetUrl || !sheetSecret) {
    console.error("❌ RSVP_SHEET_URL and RSVP_SHEET_SECRET must be set");
    return NextResponse.json(
      { error: "RSVPs aren't open yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const { firstName, lastName, email, phone } = await request.json();

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }
    // Email is optional, but if given it should look like one
    if (email?.trim() && !EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json(
        { error: "Please check your email address" },
        { status: 400 }
      );
    }

    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: sheetSecret,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email?.trim() || "",
        phone: phone?.trim() || "",
      }),
    });
    const result = await res.json().catch(() => null);

    if (!res.ok || !result?.ok) {
      console.error("❌ Google Sheet error:", res.status, result);
      return NextResponse.json(
        { error: "We couldn't save your RSVP. Please try again." },
        { status: 502 }
      );
    }

    if (result.duplicate) {
      return NextResponse.json(
        { error: "You've already RSVP'd with this email." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "RSVP saved" });
  } catch (error: any) {
    console.error("❌ RSVP error:", error.message);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

// Previous Mailchimp version, kept for reference.
// import mailchimp from "@mailchimp/mailchimp_marketing";
// import crypto from "crypto";
//
// const apiKey = process.env.MAILCHIMP_API_KEY;
// const server = process.env.MAILCHIMP_SERVER_PREFIX;
// const listId = process.env.MAILCHIMP_AUDIENCE_ID;
//
// if (!apiKey || !server || !listId) {
//   throw new Error(
//     "Mailchimp API key, server prefix, and audience ID must be defined in environment variables."
//   );
// }
//
// mailchimp.setConfig({
//   apiKey,
//   server,
// });
//
// export async function POST(request: Request) {
//   try {
//     const { firstName, lastName, email, phone } = await request.json();
//
//     if (!firstName || !lastName) {
//       return NextResponse.json(
//         { error: "First and last name are required" },
//         { status: 400 }
//       );
//     }
//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required for RSVP" },
//         { status: 400 }
//       );
//     }
//
//     const subscriberHash = crypto
//       .createHash("md5")
//       .update(email.toLowerCase())
//       .digest("hex");
//
//     // Add/update subscriber
//     const existingMember = await mailchimp.lists.setListMember(
//       listId!,
//       subscriberHash,
//       {
//         email_address: email,
//         status_if_new: "subscribed",
//         status: "subscribed",
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName,
//           PHONE: phone || "",
//         },
//       }
//     );
//
//     const member = existingMember as { status?: string };
//     console.log("✅ Subscriber synced:", member.status);
//
//     // Reset RSVP tag to always trigger automation
//     await mailchimp.lists.updateListMemberTags(listId!, subscriberHash, {
//       tags: [{ name: "RSVP Confirmed", status: "inactive" }], // remove if present
//     });
//
//     await mailchimp.lists.updateListMemberTags(listId!, subscriberHash, {
//       tags: [{ name: "RSVP Confirmed", status: "active" }], // re-add
//     });
//
//     console.log("🏷️ RSVP tag reset and re-applied");
//
//     return NextResponse.json({
//       message: "Subscriber updated and tagged",
//       data: existingMember,
//     });
//   } catch (error: any) {
//     console.error("❌ Mailchimp Error:", error.response?.body || error.message);
//     return NextResponse.json(
//       { error: error.response?.body?.detail || "An error occurred" },
//       { status: 500 }
//     );
//   }
// }
