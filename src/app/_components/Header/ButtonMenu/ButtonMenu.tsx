import { Button } from "@/components/ui/button";

export default function ButtonMenu({ children, onClick }: any) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 w-full justify-start"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
