import React from "react";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/ui/mode.toggle";
import Link from "next/link";

async function getData(): Promise<any[]> {
  const data = await fetch(`http://localhost:8000/admin/models`);
  return data.json();
}

export default async function SideBar() {
  const data = await getData();

  return (
    <aside className="bg-gray-800 w-64 h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Admin Panel
        </h1>
      </div>
      {/* <Separator /> */}
      <ul className="p-3">
        {data.map((model: any) => {
          return (
            <li className="mb-3 list-none" key={model}>
              <Link
                href={`${String(model).toLocaleLowerCase()}`}
                className="block text-white hover:text-gray-400"
              >
                {model}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="p-3 absolute bottom-0">
        <ModeToggle />
      </div>
    </aside>
  );
}
