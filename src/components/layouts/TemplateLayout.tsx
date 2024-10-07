import { ReactNode } from "react";
import TemplateHeader from "../shared/headers/TemplateHeader";

const TemplateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TemplateHeader />
      {children}
    </div>
  );
};

export default TemplateLayout;
