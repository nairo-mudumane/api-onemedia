import { Request, Response } from "express";
import { IEmailSendRequest } from "../../@types";
import { fromRootTo } from "../../resources";
import { Mailer } from "../../services";
import { checkBodyFields } from "./utils";

export async function sendEmail(request: Request, response: Response) {
  const payload = request.body as IEmailSendRequest;

  try {
    checkBodyFields(payload);
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const mailer = new Mailer();
    const adminRecipients = ["it.onemediamoz@gmail.com"];
    const clientTemplate = fromRootTo("views/emails/client-website.ejs");
    const adminTemplate = fromRootTo("views/emails/admin-website.ejs");

    await mailer.sendEmailWithHTML({
      htmlPath: adminTemplate,
      htmlData: { ...payload },
      subject: `Nova mensagem de ${payload.senderName} referente a ${payload.senderSubject}`,
      to: adminRecipients,
    });

    mailer.sendEmailWithHTML({
      htmlPath: clientTemplate,
      htmlData: { ...payload },
      subject: `Resposta referente a ${payload.senderSubject}`,
      to: [payload.senderEmail!],
    });

    return response.status(200).json({ message: "enviado" });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
