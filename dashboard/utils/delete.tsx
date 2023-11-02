async function deleteRecord(model: string, id: number) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/models/${model}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return data.json();
}

export { deleteRecord };
