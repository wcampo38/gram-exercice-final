import { createClient } from "@/prismicio";
import JobCard from "@/components/JobCard";
import TagCloud from "@/components/TagCloud";
import { Suspense } from "react";
import Image from "@/components/ui/Image";
import Link from "next/link";

export default async function HomePage() {
  const client = createClient();

  const jobs = await client.getAllByType("job_offer", {
    orderings: [
      { field: "my.job_offer.publication_date", direction: "desc" },
    ],
    limit: 6,
  });

  return (
    <main>
      <Image />

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-[#1b2a4a] mb-1">
          Nos dernières opportunités
        </h2>
        <div className="border-b-2 border-blue-500 w-48 mb-8" />

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

        <div className="flex justify-center mt-10">
          <Link
            href="/liste"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            Voir toutes les offres
          </Link>
        </div>
      </div>
    </main>
  );
}