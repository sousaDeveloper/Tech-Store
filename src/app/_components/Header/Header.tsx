"use client";

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
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import ButtonMenu from "./ButtonMenu/ButtonMenu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <header className="flex justify-between items-center py-5 px-6 border-b border-solid">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon size={21} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-[1.3rem]">
          <SheetHeader className="pl-3 pb-3 border-b w-full">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex items-center gap-2 p-2 pb-0">
              <Avatar>
                <AvatarFallback>
                  {data.user.name?.[0].toUpperCase()}
                </AvatarFallback>
                {data.user.image && <AvatarImage src={data.user.image} />}
              </Avatar>

              <div className="flex flex-col">
                <p>{data.user.name}</p>
                <p className="text-sm opacity-65">Boas compras!</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5 mx-2">
            {status === "unauthenticated" && (
              <ButtonMenu onClick={handleLoginClick}>
                <LogInIcon size={16} /> Fazer Login
              </ButtonMenu>
            )}

            <ButtonMenu>
              <HomeIcon size={16} />
              Início
            </ButtonMenu>

            <ButtonMenu>
              <ListOrderedIcon size={16} />
              Catálogo
            </ButtonMenu>

            <ButtonMenu>
              <PercentIcon size={16} />
              Ofertas
            </ButtonMenu>

            {status === "authenticated" && (
              <ButtonMenu onClick={handleLogoutClick}>
                <LogOutIcon size={16} /> Sair da Conta
              </ButtonMenu>
            )}
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
