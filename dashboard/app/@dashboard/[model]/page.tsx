import { DataTable } from "@/components/table-builder";
import { fetchRecords, generateColumns } from "@/utils/model";

export default async function Model({ params }: { params: { model: string } }) {
  const data = await fetchRecords(params.model);
  const columns = await generateColumns(data);

  return (
    <div className="w-screen">
      <h1 className="m-2 mb-4 text-2xl text-left capitalize">{params.model}</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
