import { NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function GET() {
  const client = createClient();

  const jobs = await client.getAllByType("job_offer", {
    orderings: [
      { field: "my.job_offer.publication_date", direction: "desc" },
    ],
    limit: 3,
  });

  const payload = jobs.map((job) => ({
    id: job.id,
    uid: job.uid,
    title: job.data.title,
    summary: job.data.summary,
    location: job.data.location,
    contract_type: job.data.contract_type,
    publication_date: job.data.publication_date,
    technologies: (job.data.technologies ?? [])
    .map((t) => t.technology_name)
    .filter((name): name is string => !!name),
    url: `/offres/${job.uid}`,
  }));

  return NextResponse.json({ jobs: payload }, { status: 200 });
}