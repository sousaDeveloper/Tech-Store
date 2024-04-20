"use client";

import { Button } from "@/components/ui/button";
import { HeadphonesIcon, KeyboardIcon, MouseIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data } = useSession();

  return (
    <main className="p-5">
      <Image
        src="/banner-home-01.png"
        width={0}
        height={0}
        alt="Até 55% de desconto esse mês!"
        sizes="100vw"
        className="h-auto w-full"
      />
    </main>
  );
}
