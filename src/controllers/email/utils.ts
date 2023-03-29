import { z as zod, ZodError } from "zod";
import { IEmailSendRequest } from "../../@types";

export function checkBodyFields(payload: IEmailSendRequest) {
  const schema = zod.object({
    senderEmail: zod
      .string({ required_error: "Campo e-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    senderMessage: zod.string({
      required_error: "Campo mensagem é obrigatório",
    }),
    senderName: zod.string({ required_error: "Campo nomé é obrigatório" }),
    senderSubject: zod.string({
      required_error: "Campo assunto é obrigatório",
    }),
  });

  try {
    schema.parse(payload);
  } catch (error) {
    const message: string[] = [];

    (error as ZodError).issues.forEach((issue) =>
      message.push(`[ERR_${issue.code.toUpperCase()}]: ${issue.message}`)
    );

    throw new Error(message[0]);
  }
}
