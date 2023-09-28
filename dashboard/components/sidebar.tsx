"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import modelStore from "@/store/modelStore";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/ui/mode.toggle";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="bg-gray-800 w-64 h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Admin Panel
        </h1>
      </div>
      <Separator />
      <ul className="p-3">
        {modelStore.models?.map((model: any) => {
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
};

export default observer(SideBar);
