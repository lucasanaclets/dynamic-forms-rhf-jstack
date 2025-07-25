import { Label } from "@radix-ui/react-label";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";

export function App() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Links</h1>

        <form className="mt-10 flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" />
            </div>
            <div className="flex-1 flex gap-4 items-end">
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" />
              </div>

              <Button variant="destructive" className="cursor-pointer">
                <Trash2Icon />
              </Button>
            </div>
          </div>

          <Button
            className="w-full border-dashed mt-6 cursor-pointer"
            variant="outline"
          >
            <PlusCircleIcon />
            Adicionar novo Link
          </Button>
        </form>
      </div>
    </div>
  );
}
