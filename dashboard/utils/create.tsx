async function fetchModelFields(model: string): Promise<any[]> {
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

export { fetchModelFields, getOptions };
