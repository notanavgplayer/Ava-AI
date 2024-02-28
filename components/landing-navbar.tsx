"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center absolute top-0 left-0 w-full justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-16 w-52 lg:w-64 xl:ml-20 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
      </Link>
      <div className="flex items-center gap-x-2 z-10">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="rounded-full xl:mr-20">
            Launch App
          </Button>
        </Link>
      </div>
    </nav>
  );
};
