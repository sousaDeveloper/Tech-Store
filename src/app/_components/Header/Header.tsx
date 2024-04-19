import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import ButtonMenu from "./ButtonMenu/ButtonMenu";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-6 border-b border-solid">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon size={21} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-5">
          <SheetHeader className="pl-3 pb-3 border-b w-full">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 pt-5 px-2">
            <ButtonMenu>
              <LogInIcon size={16} /> Fazer Login
            </ButtonMenu>

            <ButtonMenu>
              <HomeIcon size={16} />
              Início
            </ButtonMenu>

            <ButtonMenu>
              <PercentIcon size={16} />
              Ofertas
            </ButtonMenu>

            <ButtonMenu>
              <ListOrderedIcon size={16} />
              Catálogo
            </ButtonMenu>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="font-semibold text-xl bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
        Tech Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon size={21} />
      </Button>
    </header>
  );
}
