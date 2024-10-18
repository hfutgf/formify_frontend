import TemplateCards from "@/components/shared/dashboard/TemplateCards";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IGetTemplates } from "@/types/template.types";
import { useEffect, useState } from "react";

const MyTemplates = () => {
  const [myTemplates, setMyTemplates] =
    useState<(IGetTemplates | undefined)[]>();

  const { templates } = useTemplateStore();
  const { user } = useUserStore();

  useEffect(() => {
    const myTemplates = templates.map((item) => ({
      theme: item?.theme,
      data: item?.data?.filter((template) => template.authorId === user?.id),
    }));
    setMyTemplates(myTemplates);
  }, [templates, user?.id]);

  return (
    <div>
      {myTemplates?.map((item) =>
        item?.data?.length ? (
          <TemplateCards
            key={item?.theme}
            theme={item?.theme}
            templates={item?.data}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default MyTemplates;
