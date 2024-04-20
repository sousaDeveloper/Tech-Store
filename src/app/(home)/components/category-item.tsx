import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";

import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const categoryIcon = {
    keyboards: <KeyboardIcon size={18} />,
    monitors: <MonitorIcon size={18} />,
    headphones: <HeadphonesIcon size={18} />,
    mousepads: <SquareIcon size={18} />,
    speakers: <SpeakerIcon size={18} />,
    mouses: <MouseIcon size={18} />,
  };

  return (
    <>
      <Button variant="outline" className="flex w-[167px] gap-2">
        {categoryIcon[category.slug as keyof typeof categoryIcon]}
        <span>{category.name}</span>
      </Button>
    </>
  );
}
