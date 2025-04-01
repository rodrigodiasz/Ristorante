"use client";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato proibido!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = await getCookieClient();

    await api
      .post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Falha ao cadastrar esse produto!");
        return;
      });

    toast.success("Produto registrado com sucesso");
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-col items-center px-4 py-8">
      <h1 className="mb-5 text-2xl font-bold">Novo Produto</h1>

      <form
        className="flex flex-col rounded-md p-6 w-full gap-5 max-w-md"
        action={handleRegisterProduct}
      >
        <label className="w-[100%] h-[280px] relative flex flex-col border-1 border-gray-10 items-center justify-center rounded-xl cursor-pointer overflow-hidden bg-dark-700 hover:bg-dark-600 transition-colors">
          <span className="flex items-center justify-center z-10">
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover z-0"
              quality={100}
              priority
            />
          )}
        </label>

        <Select name="category" onValueChange={(value) => console.log(value)}>
          <SelectTrigger className="bg-dark-900 border-1 border-gray-10">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={category.id} value={String(index)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="bg-dark-900 rounded-md py-2 px-2 border-1 border-gray-10"
          type="text"
          name="name"
          required
          placeholder="Nome do produto"
        />
        <Input
          className="bg-dark-900 rounded-md py-2 px-2 border-1 border-gray-10"
          type="text"
          name="price"
          required
          placeholder="Preco do produto"
        />

        <Textarea
          className="bg-dark-900 rounded-md w-full min-h-[120px] p-5 border-1 border-gray-10"
          name="description"
          required
          placeholder="Descricao do Produto"
        ></Textarea>

        <Button className="bg-green-400 text-white font-bold hover:bg-green-600">
          Cadastrar Produto
        </Button>
      </form>
    </main>
  );
}
