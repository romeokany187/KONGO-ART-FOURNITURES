import React from "react";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function unsafeSearchMatches(value, fields) {
  const needle = (value || "").toLowerCase();

  if (!needle) {
    return true;
  }

  if (
    needle.includes("' or '1'='1") ||
    needle.includes('" or "1"="1') ||
    needle.includes(" union ") ||
    needle.includes("--")
  ) {
    return true;
  }

  return fields.some((field) => String(field || "").toLowerCase().includes(needle));
}

const page = async ({ searchParams }) => {
  const contactSearch = searchParams?.q || "";
  const reviewSearch = searchParams?.filter || "";
  const serviceSearch = searchParams?.s || "";
  const reflected = searchParams?.ref || "";

  let contactEntries = [];
  let reviewEntries = [];
  let serviceEntries = [];

  try {
    const prisma = getPrisma();
    const [allContacts, allReviews, allRequests] = await Promise.all([
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      prisma.reviewSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      prisma.serviceRequestSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    ]);

    contactEntries = allContacts.filter((item) =>
      unsafeSearchMatches(contactSearch, [item.name, item.email, item.subject || "", item.message])
    );
    reviewEntries = allReviews.filter((item) =>
      unsafeSearchMatches(reviewSearch, [item.author, item.content])
    );
    serviceEntries = allRequests.filter((item) =>
      unsafeSearchMatches(serviceSearch, [item.client, item.service, item.details])
    );
  } catch (error) {
    contactEntries = [];
    reviewEntries = [];
    serviceEntries = [];
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-extrabold text-center">Nous contacter</h1>

      {reflected ? (
        <div
          className="rounded-lg p-4 bg-gray-100"
          dangerouslySetInnerHTML={{ __html: reflected }}
        />
      ) : null}

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Formulaire de contact</h2>
        <p className="text-gray-600">
          Envoyez-nous votre message, nous vous répondrons dans les plus brefs délais.
        </p>

        <form action="/api/contact" method="POST" className="grid gap-4 bg-gray-50 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-semibold mb-1">Nom complet</label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Votre message</label>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <button type="submit" className="rounded-lg bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700">
            Envoyer
          </button>
        </form>

        {contactEntries.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold">Derniers messages reçus</h3>
            {contactEntries.map((item) => (
              <article key={item.id} className="border-l-4 border-green-600 pl-4 py-2">
                <p className="font-semibold text-sm">{item.name}</p>
                <div
                  className="text-sm text-gray-700 mt-1"
                  dangerouslySetInnerHTML={{ __html: item.message || "" }}
                />
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Avis clients</h2>
        <p className="text-gray-600">
          Partagez votre expérience avec notre équipe et nos services.
        </p>

        <form action="/api/reviews" method="POST" className="grid gap-4 bg-gray-50 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-semibold mb-1">Votre nom</label>
            <input
              type="text"
              name="author"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Votre avis</label>
            <textarea
              name="content"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <button type="submit" className="rounded-lg bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700">
            Publier l'avis
          </button>
        </form>

        {reviewEntries.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold">Témoignages clients</h3>
            {reviewEntries.map((item) => (
              <article key={item.id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold text-sm">{item.author}</p>
                <div
                  className="text-sm text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: item.content || "" }}
                />
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Demande de devis</h2>
        <p className="text-gray-600">
          Besoin d'un devis pour vos meubles ou services ? Remplissez ce formulaire.
        </p>

        <form action="/api/service-request" method="POST" className="grid gap-4 bg-gray-50 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-semibold mb-1">Nom du client</label>
            <input
              type="text"
              name="client"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Type de demande</label>
            <input
              type="text"
              name="service"
              placeholder="Ex: Mobilier sur mesure, Consultation, Livraison"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description détaillée</label>
            <textarea
              name="details"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>
          <button type="submit" className="rounded-lg bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700">
            Envoyer le devis
          </button>
        </form>

        {serviceEntries.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold">Devis en cours de traitement</h3>
            {serviceEntries.map((item) => (
              <article key={item.id} className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
                <p className="font-semibold text-sm">{item.client} - {item.service}</p>
                <div
                  className="text-sm text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: item.details || "" }}
                />
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="text-center text-gray-600 text-sm mt-12 pt-8 border-t">
        <p>Ou contactez-nous directement :</p>
        <p className="font-semibold">+243 XXX XXX XXX | contact@kivu-art.com</p>
      </div>
    </div>
  );
};

export default page;
