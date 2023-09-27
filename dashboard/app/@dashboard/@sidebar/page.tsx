"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import modelStore from "@/store/modelStore";
import { Separator } from "@/components/ui/separator"
import ModeToggle from "@/components/ui/mode.toggle";


const SideBar = () => {
  modelStore.getModels();
  console.log(modelStore.models);
  return (
    <div className=" bg-blue-500 text-white h-screen w-64 flex-col justify-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <Separator />
      <nav className="p-2">
        <ul>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-400">
              Users
            </a>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-2 left-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default observer(SideBar);
