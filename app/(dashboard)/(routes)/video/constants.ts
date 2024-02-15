import * as z from "zod";

export const formSchema = z.object({
  audioOrVideoUrl: z.string().min(1, {
    message: "Please upload an audio",
  }),
  imageOrVideoUrl: z.string().min(1, {
    message: "Please upload an image",
  }),
});
