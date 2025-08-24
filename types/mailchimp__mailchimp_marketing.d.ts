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
    updateListMemberTags(
      arg0: string,
      subscriberHash: string,
      arg2: { tags: { name: string; status: string }[] }
    ): unknown;
    setListMember(
      listId: string,
      subscriberHash: string,
      arg2: {
        email_address: any;
        status_if_new: string;
        status: string;
        merge_fields: { FNAME: any; LNAME: any; PHONE: any };
      }
    ): unknown;
    addListMember(listId: string, params: AddListMemberParams): Promise<any>;
  }

  interface MailchimpMarketing {
    setConfig(config: MailchimpConfig): void;
    lists: ListsApi;
  }

  const mailchimp: MailchimpMarketing;
  export default mailchimp;
}
