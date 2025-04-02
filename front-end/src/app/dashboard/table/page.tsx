"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

export default function TableOpen() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const router = useRouter(); 

  async function openOrder() {
    if (number === "") {
      return;
    }
    const token = await getCookieClient();
    try {
      // Verifica se já existe um pedido (mesa) com o mesmo número
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data;
      if (orders.some((order: any) => order.table === Number(number))) {
        toast.error("Mesa já cadastrada");
        return;
      }

      // Se não existir, cria o pedido (mesa)
      await api.post(
        "/order",
        {
          table: Number(number),
          name: name ? name : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Mesa aberta com sucesso");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao abrir mesa");
      console.log(err);
    }
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center pt-50">
      <h1 className="text-3xl mb-10">Cadastrar Mesa</h1>
      <form className="flex flex-col gap-2 w-150">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Número"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <Input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <Button
          className="bg-green-400 text-white font-bold hover:bg-green-600"
          type="button"
          onClick={openOrder}
        >
          Abrir Mesa
        </Button>
      </form>
    </main>
  );
}
