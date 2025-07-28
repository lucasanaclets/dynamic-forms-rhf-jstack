import { Reorder, useDragControls } from "framer-motion";
import { Button } from "./Button";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "./Input";
import { useFormContext } from "react-hook-form";

interface ILinkItemProps {
  index: number;
  isDraggingActive: null | boolean;
  link: {
    title: string;
    url: string;
  };
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
}

export function LinkItem({
  link,
  index,
  isDraggingActive,
  onDragStart,
  onDragEnd,
  onRemove,
}: ILinkItemProps) {
  const form = useFormContext();
  const controls = useDragControls();

  return (
    <Reorder.Item
      className="relative"
      value={link}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={cn(
          "flex gap-4 transition-opacity",
          isDraggingActive === false && "opacity-50"
        )}
      >
        <div className="flex-1 flex gap-4 items-end">
          <Button
            type="button"
            variant="link"
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab"
          >
            <GripVerticalIcon className="size-4" />
          </Button>

          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...form.register(`links.${index}.title`)} />
          </div>
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
            onClick={onRemove}
            tabIndex={-1} // Desabilita o tab no botão de deleção
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
}
