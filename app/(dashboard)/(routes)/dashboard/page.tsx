"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Bot,
    Headphones,
    ImageIcon,
    MusicIcon,
    VideoIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Audio Generation",
    icon: Headphones,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/audio",
  },

  {
    label: "Music Generation",
    icon: MusicIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/music",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "text-orange-700/10",
    href: "/video",
  },
  {
    label: "Pre-Loved Avatars",
    icon: Bot,
    color: "text-blue-700",
    bgColor: "text-orange-700/10",
    href: "/pre-loved-avatars",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="lg:text-6xl md:text-5xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Discover our exceptional AI tools.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
