import { Label } from "@radix-ui/react-label";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: "Link 01", url: "https://jstack.com.br" },
        { title: "Link 02", url: "https://instagram.com.br" },
      ],
    },
  });

  const links = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight mb-10">Links</h1>

        <Button
          type="button"
          className="w-full border-dashed mb-6 cursor-pointer"
          variant="outline"
          onClick={() => {
            links.prepend({ title: "", url: "" });
          }}
        >
          <PlusCircleIcon />
          Adicionar no Inicio da Lista
        </Button>

        <form className=" flex flex-col gap-2">
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...form.register(`links.${index}.title`)} />
              </div>
              <div className="flex-1 flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </div>

                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => {
                    links.remove(index);
                  }}
                  tabIndex={-1} // Desabilita o tab no botão de deleção
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            className="w-full border-dashed mt-6 cursor-pointer"
            variant="outline"
            onClick={() => {
              links.append({ title: "", url: "" });
            }}
          >
            <PlusCircleIcon />
            Adicionar novo Link
          </Button>

          <div className="flex gap-4">
            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => links.insert(1, { title: "", url: "" })} // Adiciona em um local especifico
            >
              Insert
            </Button>
            <Button className="flex-1 " type="button" variant="secondary">
              Botão 2
            </Button>
            <Button className="flex-1 " type="button" variant="secondary">
              Botão 3
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
