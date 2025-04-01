import Link from "next/link";
import { api } from "../services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }
      const cookieStore = await cookies();
      const expressTime = 60 * 60 * 24 * 30 * 1000;
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
      });
    } catch (err) {
      console.log(err);
      return;
    }

    redirect("/dashboard");
  }
  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col min-h-screen p-2">
        <div className="mb-5">
        <h1 className="text-4xl text-green-500 font-bold">Ris<span className="text-white">tora</span><span className="text-red-500">nte</span></h1>
        </div>

        <section className="flex flex-col items-center">
          <form
            className="flex flex-col gap-4 sm:w-150 w-70"
            action={handleLogin}
          >
            <Input
              className="bg-dark-900 px-2 py-1.5 border-1 border-gray-10 rounded-md"
              type="email"
              placeholder="E-mail"
              required
              name="email"
            />
            <Input
              className="bg-dark-900 px-2 py-1.5 border-1 border-gray-10 rounded-md"
              type="password"
              placeholder="Senha"
              required
              name="password"
            />
          <Button className="py-1.5 font-bold text-white bg-green-500 hover:bg-green-700 rounded-md" type="submit">
            Login
          </Button>
          </form>

          <p className="mt-4">
            Não possui uma conta?{" "}
            <Link href="/signup" className="text-green-500 font-bold">
              Cadastre-se{" "}
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
