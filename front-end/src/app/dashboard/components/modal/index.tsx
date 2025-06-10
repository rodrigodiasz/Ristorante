import { X, Trash2, Receipt } from "lucide-react";
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
  const { onRequestClose, order, finishOrder, removeOrderItem } =
    use(OrderContext);

  async function handleFinishOrder() {
    if (order.length === 0) return;
    await finishOrder(order[0].order.id);
  }

  function handleRemoveItem(itemId: string) {
    removeOrderItem(itemId);
  }

  return (
    <AlertDialog open={order.length > 0} onOpenChange={onRequestClose}>
      <AlertDialogContent className="max-w-md dark:bg-zinc-800 bg-white border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-lg">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Receipt className="w-5 h-5 text-emerald-500" />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-zinc-900 dark:text-white">
                Detalhes do Pedido
              </AlertDialogTitle>
            </div>
            <button
              onClick={onRequestClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
            >
              <X size={20} className="text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>
        </AlertDialogHeader>

        {order.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              Nenhum pedido selecionado
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
              <div className="flex-1">
                <span className="text-lg font-medium text-zinc-900 dark:text-white">
                  Mesa {order[0].order.table}
                </span>
                {order[0].order?.name && (
                  <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Cliente: {order[0].order.name}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {order.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {item.product.name}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        x{item.amount}
                      </span>
                    </div>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">
                      R${" "}
                      {(parseFloat(item.product.price) * item.amount).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Total do pedido
                </span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  R$ {calculateTotalOrder(order).toFixed(2)}
                </span>
              </div>
              <AlertDialogAction
                onClick={handleFinishOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 transition-colors"
              >
                Concluir Pedido
              </AlertDialogAction>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
