async function fetchModelFields(model: string): Promise<any[]> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/models/${model}/fields`,
    { cache: "no-store" },
  );
  return data.json();
}

async function getOptions(model: string): Promise<any[]> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/models/${model}`,
    {
      cache: "no-store",
    },
  );
  return data.json();
}

async function creteRecord(model: any, newRecord: any) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/models/${model}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    },
  );

  return data;
}

export { fetchModelFields, getOptions, creteRecord };
