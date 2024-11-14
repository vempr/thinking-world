import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const timeRegex = new RegExp(
  "^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$",
);

export const eventPostSchema = z.object({
  title: z.string().min(1, { message: "Title can't be empty" }),
  color: z.string(),
  time: z
    .string()
    .regex(timeRegex, { message: "Invalid time" })
    .or(z.string().max(0)),
});

export type EventPost = z.infer<typeof eventPostSchema>;
export const eventPostResolver = zodResolver(eventPostSchema);

export const eventFullSchema = eventPostSchema.extend({ date: z.string() });
export type EventFull = z.infer<typeof eventFullSchema>;
export const eventFullResolver = zodResolver(eventFullSchema);
