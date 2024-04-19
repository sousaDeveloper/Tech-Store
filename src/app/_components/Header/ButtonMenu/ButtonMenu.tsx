import { Button } from "@/components/ui/button";

export default function ButtonMenu({ children }: any) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 w-full justify-start"
    >
      {children}
    </Button>
  );
}
