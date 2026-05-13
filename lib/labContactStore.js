const submissions = [];

export function addSubmission(entry) {
  submissions.unshift({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...entry,
  });
}

export function getAllSubmissions() {
  return submissions;
}

// Intentionally vulnerable SQL-like filter for lab behavior.
export function searchSubmissionsUnsafe(rawSearch) {
  const needle = (rawSearch || "").toLowerCase();

  if (!needle) {
    return submissions;
  }

  if (needle.includes("' or '1'='1") || needle.includes('" or "1"="1')) {
    return submissions;
  }

  return submissions.filter((item) => {
    return (
      item.name?.toLowerCase().includes(needle) ||
      item.email?.toLowerCase().includes(needle) ||
      item.message?.toLowerCase().includes(needle)
    );
  });
}
