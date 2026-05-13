import React from "react";
import { searchSubmissionsUnsafe } from "@/lib/labContactStore";

export const dynamic = "force-dynamic";

const page = ({ searchParams }) => {
  const search = searchParams?.search || "";
  const saved = searchParams?.saved === "1";
  const entries = searchSubmissionsUnsafe(search);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-extrabold">Boite de reception Contact</h1>

      {saved ? (
        <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-green-800">
          Message enregistre.
        </p>
      ) : null}

      <form method="GET" className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Recherche"
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
        <button
          type="submit"
          className="rounded-lg bg-black text-white px-5 py-3"
        >
          Filtrer
        </button>
      </form>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <p className="text-gray-500">Aucune donnee.</p>
        ) : (
          entries.map((item) => (
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
    </div>
  );
};

export default page;