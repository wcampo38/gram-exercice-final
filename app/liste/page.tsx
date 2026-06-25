import { createClient } from "@/prismicio";
import JobCard from "@/components/JobCard";
import TagCloud from "@/components/TagCloud";
import { Suspense } from "react";

const PAGE_SIZE = 6;

type Props = {
  searchParams: Promise<{ tech?: string; page?: string }>;
};

export default async function ListePage({ searchParams }: Props) {
  const { tech, page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const client = createClient();
  const allJobs = await client.getAllByType("job_offer");

  // Tag cloud
  const tagCount: Record<string, number> = {};
  for (const job of allJobs) {
    for (const t of job.data.technologies ?? []) {
      const name = t.technology_name;
      if (name) tagCount[name] = (tagCount[name] ?? 0) + 1;
    }
  }
  const tags = Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Filtrer
  const filtered = tech
    ? allJobs.filter((job) =>
        job.data.technologies?.some((t) => t.technology_name === tech)
      )
    : allJobs.sort((a, b) =>
        (b.data.publication_date ?? "").localeCompare(
          a.data.publication_date ?? ""
        )
      );

  // Pagination
  const jobs = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold text-[#1b2a4a] mb-1">
        Offres d&apos;emploi
      </h1>
      <div className="border-b-2 border-blue-500 w-48 mb-8" />

      <Suspense>
        <TagCloud tags={tags} />
      </Suspense>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Aucune offre pour cette technologie.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              uid={job.uid ?? ""}
              title={job.data.title ?? ""}
              summary={job.data.summary ?? ""}
              publication_date={job.data.publication_date ?? ""}
              technologies={job.data.technologies ?? []}
            />
          ))}
        </div>
      )}
    </main>
  );
}