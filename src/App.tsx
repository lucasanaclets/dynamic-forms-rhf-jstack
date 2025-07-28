import { Button } from "./components/Button";
import { PlusCircleIcon } from "lucide-react";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { Reorder } from "framer-motion";
import { useState } from "react";
import { LinkItem } from "./components/LinkItem";

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

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);

  const handleSubmit = form.handleSubmit((formData) => {
    console.log({ formData });
  });

  function handleDragStart(index: number) {
    setDraggingIndex(index);
  }

  function handleDragEnd() {
    setDraggingIndex(null);
  }

  function handleReorder(newLinks: typeof links.fields) {
    if (draggingIndex === null) {
      return;
    }

    const draggingLink = links.fields[draggingIndex];

    newLinks.forEach((link, index) => {
      if (link === draggingLink) {
        links.move(draggingIndex, index);
        setDraggingIndex(index);
      }
    });
  }

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

        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Reorder.Group
              axis="y" // Eixo
              values={links.fields}
              onReorder={handleReorder}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  index={index}
                  isDraggingActive={
                    draggingIndex === null ? null : draggingIndex === index
                  }
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
              ))}
            </Reorder.Group>

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
              <Button
                className="flex-1 "
                type="button"
                variant="secondary"
                onClick={() => links.move(1, 0)} // Troca a posição afetando outros elementos
              >
                Move
              </Button>
              <Button
                className="flex-1 "
                type="button"
                variant="secondary"
                onClick={() => links.replace([])} // Troca a lista inteira por uma nova ou uma lista vazia
              >
                Replace
              </Button>
              <Button
                className="flex-1 "
                type="button"
                variant="secondary"
                onClick={() => links.swap(3, 1)} // Troca exatamente um elemento por outro sem afetar os demais
              >
                Suap
              </Button>
              <Button
                className="flex-1 "
                type="button"
                variant="secondary"
                onClick={() => {
                  // links.update(1, { title: "Link #02", url: "instagram.com.br" }) // Monta um novo componente (evitável)
                  form.setValue("links.1.title", "Link #02");
                  form.setValue("links.1.url", "instagram.com.br");
                }}
              >
                Update
              </Button>
            </div>

            <Button type="submit" className="w-full mt-4">
              Enviar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
