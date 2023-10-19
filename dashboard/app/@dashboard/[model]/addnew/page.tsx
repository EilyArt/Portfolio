import React from "react";
import dynamic from "next/dynamic";

const CreateForm = dynamic(() => import("@/components/form"), { ssr: false });

export default async function AddNew({
  params,
}: {
  params: { model: string };
}) {
  const data = await getData(params.model);

  const newData = await Promise.all(
    data.map(async (object: any) => {
      if (String(object.kind).toLowerCase() === "object") {
        object["records"] = await getOptions(object.type);
      }
      return object;
    }),
  );

  return (
    <section className=" overflow-y-auto">
      <CreateForm defaultValues={newData} model={params.model} />
    </section>
  );
}

async function getData(model: string): Promise<any[]> {
  const data = await fetch(
    `http://localhost:8000/admin/models/${model}/fields`,
    { cache: "no-store" },
  );
  return data.json();
}

async function getOptions(model: string): Promise<any[]> {
  const data = await fetch(`http://localhost:8000/admin/models/${model}`, {
    cache: "no-store",
  });
  return data.json();
}
