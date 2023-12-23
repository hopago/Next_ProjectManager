"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./list-header";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

export default function ListItem({ list, index }: ListItemProps) {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader list={list} />
      </div>
    </li>
  );
}