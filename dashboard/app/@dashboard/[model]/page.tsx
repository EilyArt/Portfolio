import { DataTable } from "@/components/table-builder";
import { fetchRecords, generateColumns } from "@/utils/model";

export default async function Model({ params }: { params: { model: string } }) {
  const data = await fetchRecords(params.model);
  const columns = await generateColumns(data);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
