"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import avastar from '../public/avastar_poster.png'

const testimonials = [
  {
    name: "Emily Adams",
    avatar: "E",
    title: "Software Engineer",
    description:
      '"Avastar AI stands out as an exceptional tool for those involved in audio editing and voice modulation. The cloning feature is truly remarkable; as a content creator at Pulse Publishing, I found it effortless to recreate and modify vocal tracks in any desired voice."',
  },
  {
    name: "Michael Johnson",
    avatar: "m",
    title: "Designer",
    description:
      '"Avastar AI has truly transformed the way I approach audio work. As an independent artist, the capability to clone vocal tracks and craft distinct voices is nothing short of remarkable. The software offers a wide array of tools to tweak and enhance voices to perfection."',
  },
  {
    name: "David Hernandez",
    avatar: "D",
    title: "Psychologist",
    description:
      '"Avastar AI truly distinguishes itself as an outstanding asset for individuals immersed in the realms of audio manipulation and voice modulation. Its cloning capability is nothing short of remarkable; as someone deeply entrenched in content creation at Pulse Publishing."',
  },
  {
    name: "Harper Johnson",
    avatar: "H",
    title: "Musician",
    description:
      '"Avastar AI has revolutionized my approach to audio endeavors. As a solo artist, the ability to replicate vocal tracks and fashion unique voices is truly extraordinary. The software presents an extensive toolkit for refining and enriching voices with precision."',
  },
];

export const LandingContent = () => {
  return (
    <>
    <div className="px-10 pb-20 mt-20">
      <h2 className="text-center text-4xl text-white font-bold mb-16">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:m-8">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-transparent border-2 text-white rounded-xl border-gray-800"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="flex flex-col">
                  <p className="text-xl">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 text-sm text-gray-400 italic">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
};
