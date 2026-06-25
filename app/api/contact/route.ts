import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { jobUid, senderName, senderEmail, message } = body;

  // Validation basique
  if (!jobUid || !senderName || !senderEmail || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  // Récupérer les emails admins depuis Prismic
  const client = createClient();
  const job = await client.getByUID("job_offer", jobUid);

  const recipients = (job.data.admin_emails ?? [])
    .map((entry: { email: string }) => entry.email)
    .filter(Boolean);

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "Aucun email administrateur configuré." },
      { status: 422 }
    );
  }

  // Préparer l'email sans l'envoyer
  const emailData = {
    recipients,
    subject: `Candidature — ${job.data.title}`,
    body: `
Nom : ${senderName}
Email : ${senderEmail}

Message :
${message}
    `.trim(),
    sentAt: new Date().toISOString(),
  };

  console.info("Email préparé (non envoyé) :", emailData);

  return NextResponse.json(emailData, { status: 200 });
}