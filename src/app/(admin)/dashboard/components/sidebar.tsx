import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[300px] border-r border-solid border-accent px-5 py-7">
      <h1 className="cursor-pointer bg-gradient-to-r from-[#5033C3] to-purple-600 bg-clip-text pb-10 text-center text-xl font-semibold text-transparent">
        Tech Store
      </h1>

      <div className="flex flex-col gap-3 text-start">
        <Button
          variant="outline"
          className="flex items-center justify-start gap-2 text-start"
        >
          <LayoutDashboardIcon size={16} />
          Dashboard
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-start gap-2 text-start"
        >
          <PackageIcon size={16} />
          Produtos
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-start gap-2 text-start"
        >
          <ListOrderedIcon size={16} />
          Categorias
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-start gap-2 text-start"
        >
          <PackageSearchIcon size={16} />
          Pedidos
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
