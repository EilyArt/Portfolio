import React from "react";
import dynamic from "next/dynamic";

export default async function AddNew({
  params,
}: {
  params: { model: string };
}) {
  const data = await getData(params.model);
  const CreateForm = dynamic(() => import("@/components/form"), { ssr: false });

  console.log(data);

  return (
    <section className=" overflow-y-auto">
      <CreateForm defaultValues={data} />
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
