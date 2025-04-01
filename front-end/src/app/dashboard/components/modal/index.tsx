import { X, Trash } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder, removeOrderItem} = use(OrderContext);

  async function handleFinishOrder() {
    if (order.length === 0) return;
    await finishOrder(order[0].order.id);
  }

  function handleRemoveItem(itemId: string) {
    removeOrderItem(itemId);
  }

  return (
    <AlertDialog open={order.length > 0} onOpenChange={onRequestClose}>
      <AlertDialogContent className="text-white max-w-md bg-zinc-800 border border-white/10 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center text-xl font-bold">
            Detalhes do pedido
            <button onClick={onRequestClose}>
              <X size={24} color="#FF3F4B" />
            </button>
          </AlertDialogTitle>
        </AlertDialogHeader>

        {order.length === 0 ? (
          <div className="text-center mt-4 text-white text-sm">
            <h2 className="text-xl font-bold mb-2">
              Nenhum pedido selecionado
            </h2>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="block text-xl">
                Mesa: {order[0].order.table}
              </span>
              {order[0].order?.name && (
                <span className="block text-xl font-bold bg-stone-700 rounded-md px-2">
                  {order[0].order.name}
                </span>
              )}
            </div>
            {order.map((item) => (
              <div className="mb-4 flex justify-between items-center" key={item.id}>
                <span className="block">
                  Qtd: {item.amount} - {item.product.name} <br /> R${" "}
                  {(parseFloat(item.product.price) * item.amount).toFixed(2)}
                </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
              </div>
            ))}
          </div>
        )}

        {order.length > 0 && (
          <AlertDialogFooter className="mt-4 flex items-center justify-between">
            <h3 className="font-bold">
              Valor total: R$ {calculateTotalOrder(order).toFixed(2)}
            </h3>
            <AlertDialogAction
              onClick={handleFinishOrder}
              className="bg-green-500 text-white font-bold text-red-10 hover:bg-dark-600"
            >
              Concluir pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
