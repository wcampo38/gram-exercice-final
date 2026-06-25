"use client";

import { useState } from "react";

type Props = {
  jobUid: string;
  jobTitle: string;
};

export default function ContactForm({ jobUid, jobTitle }: Props) {
  const [values, setValues] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{
    recipients: string[];
    subject: string;
    body: string;
  } | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobUid, ...values }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setResult(data);
    setStatus("success");
  }

  if (status === "success" && result) {
    return (
      <div className="border border-green-200 rounded p-4 bg-green-50">
        <p className="text-green-700 font-semibold mb-2">
          ✓ Candidature préparée avec succès
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>À :</strong> {result.recipients.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Objet :</strong> {result.subject}
        </p>
        <pre className="text-xs text-gray-500 bg-white border rounded p-3 mt-2 whitespace-pre-wrap">
          {result.body}
        </pre>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-[#1b2a4a]">
        Postuler — {jobTitle}
      </h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Nom complet</label>
        <input
          name="senderName"
          type="text"
          value={values.senderName}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          name="senderEmail"
          type="email"
          value={values.senderEmail}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          placeholder="jean@example.com"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Message</label>
        <textarea
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Bonjour, je souhaite postuler..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Une erreur est survenue.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Envoi..." : "Envoyer ma candidature"}
      </button>
    </form>
  );
}