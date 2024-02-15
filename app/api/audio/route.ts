import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, speed, voice, custom_voice } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!speed) {
      return new NextResponse("Speed is required", { status: 400 });
    }

    const voice_a = custom_voice === "custom_voice" ? "custom_voice" : "random";

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    let response;

    if (voice_a === "custom_voice") {
      response = await replicate.run(
        "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
        {
          input: {
            seed: 0,
            text: prompt,
            preset: speed,
            voice_a: voice_a,
            voice_b: "disabled",
            voice_c: "disabled",
            cvvp_amount: 0,
            custom_voice: voice,
          },
        }
      );
    } else {
      response = await replicate.run(
        "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
        {
          input: {
            seed: 0,
            text: prompt,
            preset: speed,
            voice_a: voice_a,
            voice_b: "disabled",
            voice_c: "disabled",
            cvvp_amount: 0,
          },
        }
      );
    }

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("[AUDIO_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
