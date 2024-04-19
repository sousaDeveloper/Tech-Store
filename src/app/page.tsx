"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <main>
      <h1>Olá, {data?.user?.name}!</h1>
    </main>
  );
}
