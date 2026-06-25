"use client";

import Link from "next/link";
import { Bookmark, Calendar, Code2 } from "lucide-react";

type Tech = {
  technology_name: string | null;
};

type Props = {
  id: string;
  uid: string;
  title: string | null;
  summary: string | null;
  publication_date: string | null;
  technologies: Tech[];
};

export default function JobCard({
  uid,
  title,
  summary,
  publication_date,
  technologies,
}: Props) {
  return (
    <Link
      href={`/offres/${uid}`}
      className="block border border-gray-200 rounded p-4 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-semibold text-[#1b2a4a] text-sm">{title}</h2>
        <Bookmark className="w-4 h-4 text-gray-300 shrink-0" />
      </div>

      <div className="flex items-center gap-1 text-blue-500 text-xs mb-2">
        <Calendar className="w-3 h-3" />
        <span>{publication_date}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {technologies.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-1 text-xs text-blue-500 border border-blue-200 rounded px-1.5 py-0.5"
          >
            <Code2 className="w-3 h-3" />
            {t.technology_name}
          </span>
        ))}
      </div>

      <p className="text-gray-500 text-xs line-clamp-3">{summary}</p>
    </Link>
  );
}