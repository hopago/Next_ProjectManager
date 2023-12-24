"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-actions";
import { updateListOrder } from "@/actions/list/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/card/update-card-order";

interface ListsProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function ListContainer({ data, boardId }: ListsProps) {
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("리스트가 변경되었습니다")
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("카드가 변경되었습니다")
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const [orderedList, setOrderedList] = useState(data);

  useEffect(() => {
    setOrderedList(data);
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedList(items);
      executeUpdateListOrder({ items, boardId });
    }

    if (type === "card") {
      let newOrderedList = [...orderedList];

      const sourceList = newOrderedList.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;
        setOrderedList(newOrderedList);
        executeUpdateCardOrder({
          boardId,
          items: reorderedCards
        });
      } else {
        const [moveCard] = sourceList.cards.splice(source.index, 1);

        moveCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index
        });

        destinationList.cards.forEach((card, index) => {
          card.order = index
        });

        setOrderedList(newOrderedList);
        executeUpdateCardOrder({
          boardId,
          items: destinationList.cards
        })
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedList.map((list, index) => {
              return <ListItem key={list.id} index={index} list={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
