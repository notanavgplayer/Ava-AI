import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface HoverMessageProps {
  message: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

const HoverMessage = ({
  message,
  children,
  side,
  className,
}: HoverMessageProps) => {
  return (
    <HoverCard openDelay={1000}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "p-2 w-full flex justify-center items-center m-0 text-xs text-gray-500",
          className
        )}
        side={side}
      >
        {message}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverMessage;
