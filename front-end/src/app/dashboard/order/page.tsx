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
    <main className="container mx-auto p-5 max-w-lg">
      <h1 className="text-3xl mb-10 text-center">Cadastrar Pedido</h1>

      <form className="flex flex-col gap-4">
        {/* Mesa */}
        {orders.length !== 0 && (
          <Select
            value={orderSelected?.id}
            onValueChange={(value) => {
              const selected = orders.find((order) => order.id === value);
              setOrderSelected(selected);
            }}
          >
            <SelectTrigger className="w-full bg-dark-900 border border-gray-700">
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
        )}

        {/* Categoria */}
        {category.length !== 0 && (
          <Select
            value={categorySelected?.id}
            onValueChange={(value) => {
              const selected = category.find((cat) => cat.id === value);
              setCategorySelected(selected);
            }}
          >
            <SelectTrigger className="w-full border border-gray-700">
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
        )}

        {/* Produto */}
        {products.length !== 0 && (
          <Select
            value={productSelected?.id}
            onValueChange={(value) => {
              const selected = products.find((prod) => prod.id === value);
              setProductSelected(selected);
            }}
          >
            <SelectTrigger className="w-full bg-dark-900 border border-gray-700">
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
        )}

        {/* Quantidade */}
        <div className="flex items-center gap-4">
          <label className="text-white text-lg">Quantidade:</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-50"
          />
          <Button className="w-50" onClick={handleAddItem} type="button">
            Adicionar
          </Button>
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <Button
            className="w-full bg-green-400 text-white font-bold hover:bg-green-600"
            disabled={items.length === 0}
            onClick={handleFinishOrder}
            type="button"
          >
            Finalizar Pedido
          </Button>
        </div>
      </form>

      {/* Itens adicionados */}
      <div className="flex flex-col gap-2 mt-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800 rounded p-3 flex justify-between items-center"
          >
            <span>
              {item.name} - Qtd: {item.amount}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
