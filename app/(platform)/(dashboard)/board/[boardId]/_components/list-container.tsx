"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";

interface ListsProps {
  data: ListWithCards[];
  boardId: string;
}

export default function ListContainer({ data, boardId }: ListsProps) {
  const [orderedList, setOrderedList] = useState(data); // Drag&Drop 특성상 delay는 있어서는 안됨, optimization

  useEffect(() => {
    setOrderedList(data);
  }, []);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedList.map((list, index) => {
        return <ListItem key={list.id} index={index} list={list} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}
