import { Button } from "@/components/ui/button";

import "./button-add.css";

const ButtonAdd = ({ children }: any) => {
  return (
    <Button className="buttonShadow flex items-center gap-2 transition-all duration-300">
      {children}
    </Button>
  );
};

export default ButtonAdd;
