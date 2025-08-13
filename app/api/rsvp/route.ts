import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

const apiKey = process.env.MAILCHIMP_API_KEY;
const server = process.env.MAILCHIMP_SERVER_PREFIX;

if (!apiKey || !server) {
  throw new Error(
    "Mailchimp API key and server prefix must be defined in environment variables."
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
        { error: "Email is required for Mailchimp" },
        { status: 400 }
      );
    }

    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phone || "",
        },
      } as any
    );

    return NextResponse.json({
      message: "RSVP saved successfully!",
      data: res,
    });
  } catch (error: any) {
    console.error("Mailchimp Error:", error.response?.body || error.message);
    return NextResponse.json(
      { error: error.response?.body?.detail || "An error occurred" },
      { status: 500 }
    );
  }
}
