"use client";

import { deletePost } from "@/app/actions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-900"
      disabled={isPending}
      onClick={async () => startTransition(async () => await deletePost(id))}
    >
      Delete
    </button>
  );
}
