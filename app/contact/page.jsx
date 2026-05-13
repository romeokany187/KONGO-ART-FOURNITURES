import React from "react";
import {
  searchContactSubmissionsUnsafe,
  searchReviewsUnsafe,
  searchServiceRequestsUnsafe,
} from "@/lib/labContactStore";

export const dynamic = "force-dynamic";

const page = ({ searchParams }) => {
  const contactSearch = searchParams?.contactSearch || "";
  const reviewSearch = searchParams?.reviewSearch || "";
  const serviceSearch = searchParams?.serviceSearch || "";

  const saved = searchParams?.saved === "1";
  const savedReview = searchParams?.savedReview === "1";
  const savedService = searchParams?.savedService === "1";
  const reflected = searchParams?.reflected || "";

  const contactEntries = searchContactSubmissionsUnsafe(contactSearch);
  const reviewEntries = searchReviewsUnsafe(reviewSearch);
  const serviceEntries = searchServiceRequestsUnsafe(serviceSearch);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-extrabold">Espace Services et Labo</h1>

      {saved || savedReview || savedService ? (
        <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-green-800">
          Donnee enregistree.
        </p>
      ) : null}

      {reflected ? (
        <div
          className="rounded-lg border border-red-300 bg-red-50 p-3"
          dangerouslySetInnerHTML={{ __html: reflected }}
        />
      ) : null}

      <section className="space-y-3 rounded-xl border border-gray-200 p-4">
        <h2 className="text-xl font-bold">1. Contact commercial</h2>

        <form action="/api/contact" method="POST" className="grid gap-2">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
            Envoyer
          </button>
        </form>

        <form method="GET" className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="contactSearch"
            defaultValue={contactSearch}
            placeholder="Recherche contact (test SQLi: ' OR '1'='1)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
          <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
            Filtrer
          </button>
        </form>

        <div className="space-y-3">
          {contactEntries.length === 0 ? (
            <p className="text-gray-500">Aucun message contact.</p>
          ) : (
            contactEntries.map((item) => (
              <article key={item.id} className="rounded-xl border border-gray-200 p-4 space-y-2">
                <p className="text-sm text-gray-500">{item.createdAt}</p>
                <p className="font-semibold">{item.name} - {item.email}</p>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.message || "" }}
                />
              </article>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-gray-200 p-4">
        <h2 className="text-xl font-bold">2. Avis clients</h2>

        <form action="/api/reviews" method="POST" className="grid gap-2">
          <input
            type="text"
            name="author"
            placeholder="Auteur"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <textarea
            name="content"
            placeholder="Avis"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
            Publier l'avis
          </button>
        </form>

        <form method="GET" className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="reviewSearch"
            defaultValue={reviewSearch}
            placeholder="Recherche avis (test SQLi: ' OR '1'='1)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
          <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
            Filtrer
          </button>
        </form>

        <div className="space-y-3">
          {reviewEntries.length === 0 ? (
            <p className="text-gray-500">Aucun avis.</p>
          ) : (
            reviewEntries.map((item) => (
              <article key={item.id} className="rounded-xl border border-gray-200 p-4 space-y-2">
                <p className="text-sm text-gray-500">{item.createdAt}</p>
                <p className="font-semibold">{item.author}</p>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content || "" }}
                />
              </article>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-gray-200 p-4">
        <h2 className="text-xl font-bold">3. Demande de service</h2>

        <form action="/api/service-request" method="POST" className="grid gap-2">
          <input
            type="text"
            name="client"
            placeholder="Client"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <input
            type="text"
            name="service"
            placeholder="Type de service"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <textarea
            name="details"
            placeholder="Details"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />
          <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
            Envoyer la demande
          </button>
        </form>

        <form method="GET" className="grid gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="serviceSearch"
              defaultValue={serviceSearch}
              placeholder="Recherche demandes (test SQLi: ' OR '1'='1)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
            <button type="submit" className="rounded-lg bg-black text-white px-5 py-3">
              Filtrer
            </button>
          </div>
          <input
            type="text"
            name="reflected"
            defaultValue={reflected}
            placeholder="Test XSS reflechie (ex: <img src=x onerror=alert('reflected')>)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </form>

        <div className="space-y-3">
          {serviceEntries.length === 0 ? (
            <p className="text-gray-500">Aucune demande.</p>
          ) : (
            serviceEntries.map((item) => (
              <article key={item.id} className="rounded-xl border border-gray-200 p-4 space-y-2">
                <p className="text-sm text-gray-500">{item.createdAt}</p>
                <p className="font-semibold">{item.client} - {item.service}</p>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.details || "" }}
                />
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
