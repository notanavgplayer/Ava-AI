"use client";

import { MoveUpRight } from "lucide-react";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "./landing-navbar";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
      <div className="text-white font-bold relative text-center">
        <LandingNavbar />
        <video
          src={require("../public/background.mp4")}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-semibold">
            <h1>The Best AI Tool for</h1>
            <div className="font-extrabold">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                <TypewriterComponent
                  options={{
                    strings: [
                      "Image Generation.",
                      "Video Generation.",
                      "Music Generation.",
                      "Audio Generation",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-sm mt-4 md:text-base font-light text-zinc-200">
            Avastar AI turbocharges content creation, making it 10x faster.
          </div>
          <div className="mt-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button
                variant="premium"
                className="md:text-base p-4 md:p-6 rounded-full font-medium bg-transparent"
              >
                Get Started - It&apos;s Free!
                <MoveUpRight size={18} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="text-zinc-200 mt-4 text-xs md:text-sm font-normal">
            No credit card required.
          </div>
        </div>
      </div>
    );
};