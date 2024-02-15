import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music prompt is required.",
  }),
  speed: z.string().min(1, {
    message: "Speed is required",
  }),
  voice: z.string().optional(),
  custom_voice: z.string(),
});

export const speedOptions = [
  {
    value: "standard",
    label: "Normal",
  },
  {
    value: "fast",
    label: "Fast",
  },
  {
    value: "utra_fast",
    label: "Ultra Fast",
  },
  {
    value: "high_quality",
    label: "High Quality",
  },
];

export const voiceOptions = [
  {
    value: "custom_voice",
    label: "Custom Voice",
  },
  {
    value: "random",
    label: "Random",
  },
];
