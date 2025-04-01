"use client";
import { use } from "react";
import { RefreshCw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  const router = useRouter();

  async function handleDetailOrder(order_id: string) {
    await onRequestOpen(order_id);
  }
  function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados!")
  }
  return (
    <>
      <main className="flex flex-col gap-5 mt-20 items-center">
        <section className="flex gap-2">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>
        {orders.length === 0 && <span>Nenhum pedido aberto no momento.</span>}{" "}
        <section className="flex flex-col gap-4">
          {orders.map((order) => (
            <button
              key={order.id}
              className="bg-zinc-800 w-150 flex items-center gap-2 rounded-md"
              onClick={() => handleDetailOrder(order.id)}
            >
              <div className="w-3 h-12 bg-green-400 rounded-l-md"></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>
      {isOpen && <ModalOrder />}
    </>
  );
}
