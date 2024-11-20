import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const timeRegex = new RegExp(
  "^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$",
);
export const workshiftPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title can't be empty" })
    .max(50, { message: "Title can't be longer than 50 characters" }),
  color: z.string(),
  start_time: z.string().regex(timeRegex, { message: "Invalid starting time" }),
  end_time: z.string().regex(timeRegex, { message: "Invalid ending time" }),
  is_hourly_pay: z.boolean(),
  pay: z.coerce.number(),
});
export type WorkshiftPost = z.infer<typeof workshiftPostSchema>;
export const workshiftPostResolver = zodResolver(workshiftPostSchema);

const workshiftFullSchema = workshiftPostSchema.extend({ id: z.number() });
export type WorkshiftFull = z.infer<typeof workshiftFullSchema>;

const workshiftDeleteSchema = z.object({
  id: z.number(),
});
export const workshiftDeleteResolver = zodResolver(workshiftDeleteSchema);
export type WorkshiftDelete = z.infer<typeof workshiftDeleteSchema>;

const workshiftPatchSchema = workshiftFullSchema;
export const workshiftPatchResolver = zodResolver(workshiftPatchSchema);
export type WorkshiftPatch = z.infer<typeof workshiftPatchSchema>;
