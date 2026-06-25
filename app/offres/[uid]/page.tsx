import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, FileText, Code2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";

type Props = {
  params: Promise<{ uid: string }>;
};

export default async function JobOfferPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();

  let job;
  try {
    job = await client.getByUID("job_offer", uid);
  } catch {
    notFound();
  }

  const techs = job.data.technologies ?? [];

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      {/* Retour */}
      <Link
        href="/"
        className="text-blue-500 text-sm hover:underline mb-6 inline-block"
      >
        ← Retour aux offres
      </Link>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-[#1b2a4a] mb-4">
        {job.data.title}
      </h1>

      {/* Méta */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-blue-500" />
          {job.data.location}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-blue-500" />
          {job.data.contract_type}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-blue-500" />
          {job.data.publication_date}
        </span>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-8">
        {techs.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-1 text-xs text-blue-500 border border-blue-200 rounded px-2 py-1"
          >
            <Code2 className="w-3 h-3" />
            {t.technology_name}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="prose prose-blue max-w-none text-gray-700">
        <PrismicRichText field={job.data.description} />
      </div>

      {/* Formulaire de candidature */}
      <div className="mt-12 border border-gray-200 rounded p-6">
        <ContactForm jobUid={uid} jobTitle={job.data.title ?? ""} />
      </div>
    </main>
  );
}