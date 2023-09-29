import { Payment } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

export default async function DemoPage({
  params,
}: {
  params: { model: string };
}) {
  const data = await getData(params.model);
  const columns = await generateColumns(data);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

async function getData(model: string): Promise<Payment[]> {
  const data = await fetch(`http://localhost:8000/admin/${model}`);
  return data.json();
}

async function generateColumns(data: any) {
  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
  }));
}
