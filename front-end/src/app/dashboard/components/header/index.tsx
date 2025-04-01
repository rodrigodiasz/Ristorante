"use client";

import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();
  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso!");
    router.replace("/");
  }
  return (
    <header className="container mx-auto p-5">
      <div className="flex justify-between">
        <Link href={"/dashboard"}>
        <h1 className="text-4xl text-green-500 font-bold">Ris<span className="text-white">tora</span><span className="text-red-500">nte</span></h1>
        </Link>
        

        <nav className="flex gap-5">
        <Link href={"/dashboard/table"}>Mesa</Link>
        <Link href={"/dashboard/order"}>Pedido</Link>
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/product"}>Cardapio</Link>
          <form action={handleLogout}>
            <button>
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
