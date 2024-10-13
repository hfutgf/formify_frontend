import { ReactNode } from "react";
import TemplateHeader from "../shared/headers/templateHeader/TemplateHeader";

const TemplateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TemplateHeader />
      {children}
    </div>
  );
};

export default TemplateLayout;
