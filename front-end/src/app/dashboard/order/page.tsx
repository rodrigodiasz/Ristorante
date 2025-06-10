"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";

type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: number;
};

type OrderProps = {
  id: string;
  table: number;
};

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const order_id = searchParams.get("order_id");

  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productSelected, setProductSelected] = useState<ProductProps>();
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [orderSelected, setOrderSelected] = useState<OrderProps>();
  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const token = await getCookieClient();
        const response = await api.get("/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(response.data);
        setCategorySelected(response.data[0]);
      } catch (err) {
        console.log("Erro ao carregar categorias", err);
      }
    }

    async function loadOrders() {
      try {
        const token = await getCookieClient();
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let allOrders = response.data as OrderProps[];

        if (order_id && !allOrders.find((o) => o.id === order_id)) {
          allOrders = [...allOrders, { id: order_id, table: Number(number) }];
        }

        setOrders(allOrders);

        if (order_id) {
          const mesa = allOrders.find((o) => o.id === order_id);
          setOrderSelected(mesa || allOrders[0]);
        } else {
          setOrderSelected(allOrders[0]);
        }
      } catch (err) {
        console.log("Erro ao carregar mesas", err);
      }
    }

    loadCategories();
    loadOrders();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      if (!categorySelected) return;
      try {
        const token = await getCookieClient();
        const response = await api.get("/category/product", {
          params: { category_id: categorySelected.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setProductSelected(response.data[0]);
      } catch (err) {
        console.log("Erro ao carregar produtos", err);
      }
    }
    loadProducts();
  }, [categorySelected]);

  function handleAddItem() {
    if (!productSelected) return;

    const alreadyExists = items.find(
      (item) => item.product_id === productSelected.id
    );
    if (alreadyExists) {
      toast.error("Esse item já foi adicionado.");
      return;
    }

    const newItem: ItemProps = {
      id: String(new Date().getTime()),
      product_id: productSelected.id,
      name: productSelected.name,
      amount: Number(amount),
    };
    setItems((prev) => [...prev, newItem]);
    setAmount("1");
  }

  function handleRemoveItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleFinishOrder() {
    if (!orderSelected || items.length === 0) {
      toast.error("Selecione uma mesa e adicione pelo menos um item.");
      return;
    }
    try {
      const token = await getCookieClient();
      await Promise.all(
        items.map((item) =>
          api.post(
            "/order/add",
            {
              order_id: orderSelected.id,
              product_id: item.product_id,
              amount: item.amount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );
      toast.success("Pedido finalizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.log("Erro ao finalizar pedido", err);
      toast.error("Erro ao finalizar pedido.");
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <ShoppingCart className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Cadastrar Pedido
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Selecione a mesa e adicione os itens do pedido
        </p>
      </div>

      <div className="space-y-6">
        <form className="space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
          {/* Mesa */}
          {orders.length !== 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Mesa
              </label>
              <Select
                value={orderSelected?.id}
                onValueChange={(value) => {
                  const selected = orders.find((order) => order.id === value);
                  setOrderSelected(selected);
                }}
              >
                <SelectTrigger className="w-full dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                  <SelectValue placeholder="Selecione uma mesa" />
                </SelectTrigger>
                <SelectContent>
                  {orders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      Mesa {order.table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Categoria */}
          {category.length !== 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Categoria
              </label>
              <Select
                value={categorySelected?.id}
                onValueChange={(value) => {
                  const selected = category.find((cat) => cat.id === value);
                  setCategorySelected(selected);
                }}
              >
                <SelectTrigger className="w-full dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {category.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Produto */}
          {products.length !== 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Produto
              </label>
              <Select
                value={productSelected?.id}
                onValueChange={(value) => {
                  const selected = products.find((prod) => prod.id === value);
                  setProductSelected(selected);
                }}
              >
                <SelectTrigger className="w-full dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((prod) => (
                    <SelectItem key={prod.id} value={prod.id}>
                      {prod.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantidade e Adicionar */}
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Quantidade
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700"
                min="1"
              />
            </div>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white h-10 px-4"
              onClick={handleAddItem}
              type="button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </form>

        {/* Itens adicionados */}
        {items.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Itens do Pedido
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-zinc-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      x{item.amount}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 mt-6"
              disabled={items.length === 0}
              onClick={handleFinishOrder}
              type="button"
            >
              Finalizar Pedido
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
