export const dynamic = "force-dynamic";

async function fetchPublishedEvents() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.event.findMany({
      where: { published: true },
      orderBy: { startAt: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        startAt: true,
        endAt: true,
      },
    });
  } catch {
    return [];
  }
}

function formatEventDate(startAt, endAt) {
  const start = new Date(startAt);
  if (!endAt) {
    return start.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const end = new Date(endAt);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${start.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })} • ${start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
  }

  return `${start.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })} → ${end.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export default async function EvenementsPage() {
  const events = await fetchPublishedEvents();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Événements</h1>
          <p className="text-green-primary-100 text-lg max-w-2xl mx-auto">
            Rejoignez-nous lors de nos événements exclusifs et ateliers
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center text-gray-600">
            Aucun événement publié pour le moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-br from-green-primary-100 to-green-primary-50 h-28 flex items-center justify-center text-4xl">
                  🎉
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-green-primary-600 font-semibold">
                      📅 {formatEventDate(event.startAt, event.endAt)}
                    </p>
                    <p className="text-sm text-gray-600">📍 {event.location || "Lieu à confirmer"}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description || "Détails à venir."}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
