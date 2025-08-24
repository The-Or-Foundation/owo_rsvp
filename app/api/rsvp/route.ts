import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

const apiKey = process.env.MAILCHIMP_API_KEY;
const server = process.env.MAILCHIMP_SERVER_PREFIX;
const listId = process.env.MAILCHIMP_AUDIENCE_ID;

if (!apiKey || !server || !listId) {
  throw new Error(
    "Mailchimp API key, server prefix, and audience ID must be defined in environment variables."
  );
}

mailchimp.setConfig({
  apiKey,
  server,
});

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "Email is required for RSVP" },
        { status: 400 }
      );
    }

    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    // Add/update subscriber
    const existingMember = await mailchimp.lists.setListMember(
      listId!,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phone || "",
        },
      }
    );

    const member = existingMember as { status?: string };
    console.log("✅ Subscriber synced:", member.status);

    // Reset RSVP tag to always trigger automation
    await mailchimp.lists.updateListMemberTags(listId!, subscriberHash, {
      tags: [{ name: "RSVP Confirmed", status: "inactive" }], // remove if present
    });

    await mailchimp.lists.updateListMemberTags(listId!, subscriberHash, {
      tags: [{ name: "RSVP Confirmed", status: "active" }], // re-add
    });

    console.log("🏷️ RSVP tag reset and re-applied");

    return NextResponse.json({
      message: "Subscriber updated and tagged",
      data: existingMember,
    });
  } catch (error: any) {
    console.error("❌ Mailchimp Error:", error.response?.body || error.message);
    return NextResponse.json(
      { error: error.response?.body?.detail || "An error occurred" },
      { status: 500 }
    );
  }
}
