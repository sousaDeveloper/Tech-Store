"use client";

import { useRouter } from "next/navigation";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ButtonMenu from "./ButtonMenu/ButtonMenu";
import { Badge } from "@/components/ui/badge";
import Cart from "../Cart/cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

export default function Header() {
  const { products } = useContext(CartContext);
  const router = useRouter();

  const handleRouterClick = (path: string) => {
    router.push(path);
  };

  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <header
      className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-solid px-6 py-5"
      style={{
        backdropFilter: "blur(0.5rem)",
        WebkitBackdropFilter: "blur(0.5rem)",
      }}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon size={21} />
          </Button>
        </SheetTrigger>
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
              <SheetClose>
                <ButtonMenu onClick={handleLoginClick}>
                  <LogInIcon size={16} /> Fazer Login
                </ButtonMenu>
              </SheetClose>
            )}

            <SheetClose>
              <ButtonMenu onClick={() => handleRouterClick("/")}>
                <HomeIcon size={16} />
                <p>Início</p>
              </ButtonMenu>
            </SheetClose>

            <SheetClose>
              <ButtonMenu onClick={() => handleRouterClick("/catalog")}>
                <ListOrderedIcon size={16} />
                <p>Catálogo</p>
              </ButtonMenu>
            </SheetClose>

            <SheetClose>
              <ButtonMenu>
                <PercentIcon size={16} />
                Ofertas
              </ButtonMenu>
            </SheetClose>

            {status === "authenticated" && (
              <SheetClose>
                <ButtonMenu onClick={handleLogoutClick}>
                  <LogOutIcon size={16} /> Sair da Conta
                </ButtonMenu>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <h1
        className="bg-gradient-to-r from-[#5033C3] to-purple-600 bg-clip-text text-xl font-semibold text-transparent"
        onClick={() => handleRouterClick("/")}
      >
        Tech Store
      </h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon size={21} />
            {products.length === 0 ? null : (
              <p className="absolute right-6 top-4 rounded-full bg-[#5033C3] px-[0.2rem]">
                {products.length}
              </p>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] p-0 pt-[1.3rem]">
          <SheetHeader className="w-full border-b pb-3 pl-3">
            <SheetTitle>
              <Badge
                className="flex w-fit gap-1 border-2 border-primary"
                variant="outline"
              >
                <ShoppingCartIcon />
                <p className="text-sm">Carrinho</p>
              </Badge>
            </SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </header>
  );
}
