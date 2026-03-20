"use client";

import { useState, useTransition } from "react";
import { deleteProject } from "@/lib/actions/projects";

export default function DeleteProjectButton({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-sm text-stone-500">Delete "{projectName}"?</span>
        <button
          onClick={() => {
            const fd = new FormData();
            fd.set("id", projectId);
            startTransition(() => deleteProject(fd));
          }}
          disabled={isPending}
          className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
        >
          {isPending ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-sm text-stone-400 hover:text-stone-600"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-stone-400 hover:text-red-500 transition-colors"
    >
      Delete
    </button>
  );
}
