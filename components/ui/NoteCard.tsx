import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type NoteCardProps = {
  title: string;
  preview: string;
  isActive?: boolean;
};

const NoteCard = ({ title, preview, isActive = false }: NoteCardProps) => {
  return (
    <Card
      className={`mt-4 max-w-[375px] cursor-pointer transition ${isActive ? "bg-black text-[var(--extra-light-gray)]" : ""}`}
    >
      <CardTitle className="truncate">
        {title.trim() || <span className="invisible">empty</span>}
      </CardTitle>
      <CardDescription className="truncate">
        {preview.trim() || <span className="invisible">empty</span>}
      </CardDescription>
    </Card>
  );
};

export default NoteCard;
