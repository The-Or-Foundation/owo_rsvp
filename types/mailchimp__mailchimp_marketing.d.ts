declare module "@mailchimp/mailchimp_marketing" {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface AddListMemberParams {
    email_address: string;
    status:
      | "subscribed"
      | "unsubscribed"
      | "cleaned"
      | "pending"
      | "transactional";
  }

  interface ListsApi {
    addListMember(listId: string, params: AddListMemberParams): Promise<any>;
  }

  interface MailchimpMarketing {
    setConfig(config: MailchimpConfig): void;
    lists: ListsApi;
  }

  const mailchimp: MailchimpMarketing;
  export default mailchimp;
}
