"use client";

import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { toast } from "sonner";

import { signIn, signOut, useSession } from "next-auth/react";
import { CartContext } from "@/providers/cart";

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
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ButtonMenu from "./ButtonMenu/ButtonMenu";
import { Badge } from "@/components/ui/badge";
import Cart from "../Cart/cart";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const { products } = useContext(CartContext);
  const router = useRouter();

  const handleRouterClick = (path: string) => {
    router.push(path);
  };

  const sumProductsInCart = useMemo(
    () => products.reduce((accum, sum) => accum + sum.quantity, 0),
    [products],
  );

  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
    return toast("Login realizado.");
  };

  const handleLogoutClick = async () => {
    toast("Você deslogou da sua conta com sucesso.");
    await signOut();
  };

  return (
    <header
      className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-solid px-10 py-5"
      style={{
        backdropFilter: "blur(0.5rem)",
        WebkitBackdropFilter: "blur(0.5rem)",
      }}
    >
      <Sheet>
        <SheetTrigger asChild className=" md:hidden md:flex-none">
          <Button size="icon" variant="outline">
            <MenuIcon size={21} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-[1.3rem]">
          <SheetHeader className="w-full border-b pb-3 pl-3">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div
              className="flex items-center gap-2 p-2 pb-0"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
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

          <div
            className="mx-2 mt-5 flex flex-col gap-2"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
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
                Início
              </ButtonMenu>
            </SheetClose>

            <SheetClose>
              <ButtonMenu onClick={() => handleRouterClick("/catalog")}>
                <ListOrderedIcon size={16} />
                Catálogo
              </ButtonMenu>
            </SheetClose>

            <SheetClose>
              <ButtonMenu onClick={() => handleRouterClick("/offers")}>
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
        className="cursor-pointer bg-gradient-to-r from-[#5033C3] to-purple-600 bg-clip-text text-xl font-semibold text-transparent"
        onClick={() => handleRouterClick("/")}
      >
        Tech Store
      </h1>
      <nav className="hidden flex-none items-center gap-2 md:flex">
        <button
          onClick={() => handleRouterClick("/")}
          className="flex items-center gap-1 transition-all duration-300 hover:text-[#5033C3]"
        >
          <HomeIcon size={16} />
          Início
        </button>
        <p className="opacity-40">|</p>

        <button
          onClick={() => handleRouterClick("/catalog")}
          className="flex items-center gap-1 transition-all duration-300 hover:text-[#5033C3]"
        >
          <ListOrderedIcon size={16} />
          Catálogo
        </button>
        <p className="opacity-40">|</p>
        <button
          onClick={() => handleRouterClick("/offers")}
          className="flex items-center gap-1 transition-all duration-300 hover:text-[#5033C3]"
        >
          <PercentIcon size={16} />
          Ofertas
        </button>
      </nav>

      <div className="flex gap-1">
        <NavigationMenu className="hidden flex-none md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="mt-1 bg-transparent">
                {" "}
                {status === "unauthenticated" ? (
                  <button className="rounded border-2 border-secondary bg-[#0b0b0b] p-2 hover:bg-accent">
                    <UserIcon size={21} />
                  </button>
                ) : (
                  <Avatar className="cursor-pointer">
                    {data?.user?.image && (
                      <AvatarImage src={data?.user?.image} />
                    )}
                  </Avatar>
                )}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="w-[10rem]">
                    {status === "authenticated" ? (
                      <>
                        <p className="cursor-default p-2">
                          Olá, {data?.user?.name?.split(" ")[0]}!
                        </p>
                        <DropdownMenuSeparator />
                        <NavigationMenuItem className="cursor-pointer list-none p-2 hover:bg-accent">
                          <p className="flex items-center gap-2">
                            <ListOrderedIcon size={16} />
                            Meus Pedidos
                          </p>
                        </NavigationMenuItem>
                      </>
                    ) : (
                      <p className="p-2 text-sm">Olá, faça seu login!</p>
                    )}
                    <DropdownMenuSeparator />
                    <NavigationMenuItem
                      className="cursor-pointer list-none p-2  hover:bg-accent"
                      onClick={
                        status === "authenticated"
                          ? handleLogoutClick
                          : handleLoginClick
                      }
                    >
                      {status === "authenticated" ? (
                        <p className="flex items-center gap-2">
                          <LogOutIcon size={18} />
                          Sair da Conta
                        </p>
                      ) : (
                        <p className="flex items-center gap-2">
                          <LogInIcon size={18} />
                          Login
                        </p>
                      )}
                    </NavigationMenuItem>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger className="mt-[0.3rem] h-fit rounded border-2 border-secondary bg-[#0b0b0b] p-2 transition-all duration-300 hover:bg-accent">
            <ShoppingCartIcon size={21} />
            {sumProductsInCart > 0 && (
              <p className="absolute right-9 top-3 rounded-full bg-[#5033C3] px-[0.2rem]">
                {sumProductsInCart}
              </p>
            )}
          </SheetTrigger>

          <SheetContent className="w-full overflow-y-scroll p-0 pt-[1.3rem] [&::-webkit-scrollbar]:hidden">
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
      </div>
    </header>
  );
}
