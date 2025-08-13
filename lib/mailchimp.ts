import mailchimp from "@mailchimp/mailchimp_marketing";

if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
  throw new Error(
    "Mailchimp API key or server prefix is not defined in environment variables."
  );
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY as string,
  server: process.env.MAILCHIMP_SERVER_PREFIX as string,
});

export async function addSubscriber(email: string) {
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.response?.text || error.message };
  }
}
