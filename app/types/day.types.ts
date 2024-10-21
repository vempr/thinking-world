import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const dayPostSchema = z.object({
  work_shift_id: z.number(),
  date: z.string().date(),
});
export type DayPost = z.infer<typeof dayPostSchema>;
export const dayPostResolver = zodResolver(dayPostSchema);

export const dayDeleteSchema = z.object({
  id: z.number(),
});
export type DayDelete = z.infer<typeof dayDeleteSchema>;
export const dayDeleteResolver = zodResolver(dayDeleteSchema);
