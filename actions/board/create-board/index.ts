"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId: organizationId } = auth();

  if (!userId || !organizationId) {
    return {
      error: "Unauthorized...",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing Fields...",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        organizationId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (err) {
    return {
      error: "Internal Error...",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
