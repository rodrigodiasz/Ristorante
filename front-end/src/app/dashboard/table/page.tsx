"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TableIcon } from "lucide-react";

export default function TableOpen() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function openOrder() {
    if (number === "") {
      toast.error("Por favor, insira o número da mesa");
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto max-w-2xl px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <TableIcon className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-white">
              Cadastrar Mesa
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Preencha os dados para abrir uma nova mesa
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                >
                  Número da Mesa
                </label>
                <Input
                  id="number"
                  type="number"
                  placeholder="Ex: 1"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                  className="w-full dark:bg-zinc-800 bg-white dark:text-white text-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                >
                  Nome do Cliente (opcional)
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: João Silva"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 transition-colors"
              type="button"
              onClick={openOrder}
              disabled={isLoading}
            >
              {isLoading ? "Abrindo mesa..." : "Abrir Mesa"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
