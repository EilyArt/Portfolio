// export default function Page({ params }: { params: { model: string } }) {
//   return <div className="absolute right-0 top-0">My Post: {params.model}</div>
// }

import { Payment, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "mwd@example.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
