import React from "react";
import ModeToggle from "@/components/ui/mode.toggle";
import Link from "next/link";
import { fetchSideBar } from "@/utils/sidebar";

export default async function SideBar() {
  const data = await fetchSideBar();

  return (
    <aside className="bg-gray-800 w-max h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-left text-white">Admin Panel</h1>
      </div>
      <ul className="p-3">
        {data?.map((model: any) => {
          return (
            <li className="mb-3 list-none" key={model}>
              <Link
                href={`/${String(model).toLocaleLowerCase()}`}
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
