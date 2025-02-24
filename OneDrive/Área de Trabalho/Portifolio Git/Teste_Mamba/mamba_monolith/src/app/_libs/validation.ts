import { Status } from "@prisma/client";
import z from "zod";

export const createCampaignSchema = z
  .object({
    name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    status: z.nativeEnum(Status).default(Status.PAUSADA),
    dateInitial: z.coerce.date().default(() => new Date()),
    dateEnd: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    if (data.dateEnd <= data.dateInitial) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A data de expiração da campanha precisa ser maior que a de início",
        path: ["dateEnd"],
      });
    }
  });

export const updateCampaignSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome precisa ter pelo menos 3 caracteres")
      .optional(),
    description: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    dateInitial: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateEnd && data.dateInitial && data.dateEnd <= data.dateInitial) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A data de expiração da campanha precisa ser maior que a de início",
        path: ["dateEnd"],
      });
    }
  });
