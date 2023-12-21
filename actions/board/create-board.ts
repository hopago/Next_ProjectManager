"use server";

import { z } from 'zod';

import { db } from "@/lib/db";

const CreateBoard = z.object({
    title: z.string()
});

export default async function create(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get("title")
  });

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (err: any) {

  }
}