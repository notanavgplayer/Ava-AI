import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { audioOrVideoUrl, imageOrVideoUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!imageOrVideoUrl) {
      return new NextResponse("imageOrVideoUrl is required", { status: 400 });
    }
    if (!audioOrVideoUrl) {
      return new NextResponse("audioOrVideoUrl is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const response = await replicate.run(
      "lucataco/sadtalker:85c698db7c0a66d5011435d0191db323034e1da04b912a6d365833141b6a285b",
      {
        input: {
          still: true,
          enhancer: "gfpgan",
          preprocess: "full",
          driven_audio: audioOrVideoUrl,
          source_image: imageOrVideoUrl,
        },
      }
    );

    if (!isPro) {
      await incrementApiLimit();
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
