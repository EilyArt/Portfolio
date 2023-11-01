"use client";

import React from "react";
import dynamic from "next/dynamic";
import { fetchModelFields, getOptions } from "@/utils/create";

const CreateForm = dynamic(() => import("@/components/create-form"), {
  ssr: false,
});

export default async function Create({
  params,
}: {
  params: { model: string };
}) {
  const data = await fetchModelFields(params.model);

  const newData = await Promise.all(
    data.map(async (object: any) => {
      if (String(object.kind).toLowerCase() === "object") {
        object["records"] = await getOptions(object.type);
      }
      return object;
    }),
  );

  return (
    <section className="w-2/3">
      <h1 className="m-2 mb-4 text-2xl text-left capitalize">{params.model}</h1>
      <CreateForm defaultValues={newData} model={params.model} />
    </section>
  );
}
