import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authHandler = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

export const ourFileRouter = {
  audioUpload: f({ audio: { maxFileSize: "1GB", maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
  imageUpload: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
  ImageOrVideoUpload: f({
    image: { maxFileSize: "1GB", maxFileCount: 1 },
    video: { maxFileSize: "1GB", maxFileCount: 1 },
  })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
  audioOrVideoUpload: f({
    audio: { maxFileSize: "1GB", maxFileCount: 1 },
    video: { maxFileSize: "1GB", maxFileCount: 1 },
  })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
