import { ReactNode, useEffect } from "react";
import useTemplateStore from "@/store/templates.store";
import AnswerHeader from "../shared/headers/answerHeader/answerHeader";

const AnswerLayout = ({ children }: { children: ReactNode }) => {
  const { setTemplate } = useTemplateStore();

  useEffect(() => {
    const template = JSON.parse(localStorage.getItem("template")!);
    if (template) {
      setTemplate(template);
    }
  }, [setTemplate]);

  return (
    <div>
      <AnswerHeader />
      {children}
    </div>
  );
};

export default AnswerLayout;
