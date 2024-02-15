import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, duration } = body;

    const durationInSeconds = parseInt(duration, 10);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!durationInSeconds) {
      return new NextResponse("Duration is required", { status: 400 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const output = await replicate.run(
      "pollinations/music-gen:9b8643c06debace10b9026f94dcb117f61dc1fee66558a09cde4cfbf51bcced6",
      {
        input: {
          text: prompt,
          duration: durationInSeconds,
        },
      }
    );

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(output);
  } catch (error) {
    console.log("[MUSIC_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
