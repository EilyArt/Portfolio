type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

async function fetchRecords(model: string): Promise<Payment[]> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/models/${model}`,
    {
      cache: "no-cache",
    },
  );
  return data.json();
}

async function generateColumns(data: object[]) {
  if (data && data.length > 0) {
    const columns = Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    }));

    return columns;
  } else {
    return [];
  }
}

export type { Payment };
export { fetchRecords, generateColumns };
