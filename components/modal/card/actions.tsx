"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-actions";
import { copyCard } from "@/actions/card/copy-card";
import { deleteCard } from "@/actions/card/delete-card";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { toast } from "sonner";

interface ActionProps {
  card: CardWithList;
}

export default function Actions({ card }: ActionProps) {
  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`카드 "${data.title}"가 복사 됐습니다`);
        cardModal.onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`카드 "${data.title}"가 삭제 됐습니다`);
        cardModal.onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const params = useParams();
  
  const cardModal = useCardModal();

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopy({
      id: card.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDelete({
      id: card.id,
      boardId,
    });
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        복사
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4 mr-2" />
        삭제
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
