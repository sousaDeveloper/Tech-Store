import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-6 border-b border-solid">
      <Button size="icon" variant="outline">
        <MenuIcon size={18} />
      </Button>

      <h1 className="font-semibold text-xl bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
        Tech Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon size={18} />
      </Button>
    </header>
  );
}
