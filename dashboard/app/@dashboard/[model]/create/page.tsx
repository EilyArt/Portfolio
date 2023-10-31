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
    <section className=" overflow-y-auto">
      <CreateForm defaultValues={newData} model={params.model} />
    </section>
  );
}
