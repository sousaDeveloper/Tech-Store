import { Badge } from "@/components/ui/badge";
import { LayoutDashboardIcon } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="w-full p-8">
      <Badge className="flex h-fit w-fit items-center gap-1 border-2 border-primary bg-accent uppercase">
        <LayoutDashboardIcon size={16} />
        Dashboard
      </Badge>
    </div>
  );
};

export default DashboardPage;
