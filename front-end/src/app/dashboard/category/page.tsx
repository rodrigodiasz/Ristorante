import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";
    const name = formData.get("name");

    if (name === "") {
      return;
    }

    const data = {
      name: name,
    };

    const token = await getCookieServer();

    await api
      .post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });

      redirect("/dashboard")
  }
  return (
    <main className="container mx-auto p-5 w-200">
      <h1 className="mb-3 text-3xl font-bold">Nova Categoria</h1>
      <form
        className="w-full flex flex-col gap-4"
        action={handleRegisterCategory}
      >
        <Input
          className="bg-zinc-800 px-2 py-1.5 border-1 rounded-md"
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
        />
        <Button className="bg-green-400 text-white font-bold hover:bg-green-600">
          Cadastrar
        </Button>
        
      </form>
    </main>
  );
}
