"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Tag = {
  name: string;
  count: number;
};

type Props = {
  tags: Tag[];
};

export default function TagCloud({ tags }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTech = searchParams.get("tech");

  function handleClick(name: string) {
    if (activeTech === name) {
      router.push("/liste");
    } else {
          router.push(`/liste?tech=${encodeURIComponent(name)}`);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => handleClick(name)}
          className={`text-xs px-3 py-1 rounded-full border transition ${
            activeTech === name
              ? "bg-blue-600 text-white border-blue-600"
              : "text-blue-500 border-blue-200 hover:bg-blue-50"
          }`}
        >
          {name} ({count})
        </button>
      ))}
    </div>
  );
}