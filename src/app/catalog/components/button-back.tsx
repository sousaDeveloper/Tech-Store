"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function ButtonBack() {
  const router = useRouter();

  const handleRouterBackClick = () => router.back();

  return (
    <Button
      onClick={handleRouterBackClick}
      variant="outline"
      size="icon"
      className="ml-1 border-primary"
    >
      <ChevronLeftIcon />
    </Button>
  );
}
