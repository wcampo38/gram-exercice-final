import { createClient } from "@/prismicio";

export default async function PinnedJobsChecker() {
  const client = createClient();

  const allJobs = await client.getAllByType("job_offer");

  const pinnedJobs = allJobs.filter((job) => job.data.pinned === true);

  if (pinnedJobs.length === 0) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-8 py-3">
      <p className="text-yellow-800 text-sm">
        📌 Offres épinglées disponibles :{" "}
        {pinnedJobs.map((job) => job.data.title).join(", ")}
      </p>
    </div>
  );
}