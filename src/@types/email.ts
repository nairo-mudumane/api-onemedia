export interface mailAttachments {
  path: string;
  filename?: string;
}

export declare module IMailer {
  module noHTMl {
    interface mailConfig {
      to: string[];
      subject: string;
      text: string;
      cc?: string[];
      from?: string;
      attachments?: mailAttachments[];
    }
  }

  module HTML {
    interface mailConfig extends Omit<IMailer.noHTMl.mailConfig, "text"> {
      htmlPath: string;
      htmlData: { [key: string]: any };
    }
  }
}

export interface IEmailSendRequest {
  senderName?: string;
  senderEmail?: string;
  senderSubject?: string;
  senderMessage?: string;
}
