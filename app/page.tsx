import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function HomePage() {
  const client = createClient();

  const jobs = await client.getAllByType("job_offer", {
    orderings: [
      { field: "my.job_offer.publication_date", direction: "desc" },
    ],
  });

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold text-[#1b2a4a] mb-1">
        Offres d&apos;emploi
      </h1>
      <div className="border-b-2 border-blue-500 w-48 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => {
          const techs = job.data.technologies ?? [];

          return (
            <Link
              key={job.id}
              href={`/offres/${job.uid}`}
              className="block border border-gray-200 rounded p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-[#1b2a4a] text-sm">
                  {job.data.title}
                </h2>
                <span className="text-gray-300 text-lg">🔖</span>
              </div>

              <p className="text-blue-500 text-xs mb-1">
                📅 {job.data.publication_date}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {techs.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs text-blue-500 border border-blue-200 rounded px-1"
                  >
                    {t.technology_name}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-xs line-clamp-3">
                {job.data.summary}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition">
          Voir toutes les offres
        </button>
      </div>
    </main>
  );
}