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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleRouterClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
    setTimeout(() => {
      return setIsMenuOpen(true);
    }, 1000);
  };

  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <header className="flex items-center justify-between border-b border-solid px-6 py-5">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon size={21} />
          </Button>
        </SheetTrigger>
        {isMenuOpen && (
          <SheetContent side="left" className="p-0 pt-[1.3rem]">
            <SheetHeader className="w-full border-b pb-3 pl-3">
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

            <div className="mx-2 mt-5 flex flex-col gap-2">
              {status === "unauthenticated" && (
                <ButtonMenu onClick={handleLoginClick}>
                  <LogInIcon size={16} /> Fazer Login
                </ButtonMenu>
              )}

              <ButtonMenu onClick={() => handleRouterClick("/")}>
                <HomeIcon size={16} />
                <p>Início</p>
              </ButtonMenu>

              <ButtonMenu onClick={() => handleRouterClick("/catalog")}>
                <ListOrderedIcon size={16} />
                <p>Catálogo</p>
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
        )}
      </Sheet>

      <h1 className="bg-gradient-to-r from-[#5033C3] to-purple-600 bg-clip-text text-xl font-semibold text-transparent">
        Tech Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon size={21} />
      </Button>
    </header>
  );
}
