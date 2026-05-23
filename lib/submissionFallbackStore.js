const contactSubmissions = [];
const reviewSubmissions = [];
const serviceRequestSubmissions = [];

function withMeta(entry) {
  return {
    id: String(Date.now() + Math.floor(Math.random() * 1000)),
    createdAt: new Date().toISOString(),
    ...entry,
  };
}

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

export function addContactSubmissionFallback(entry) {
  contactSubmissions.unshift(withMeta(entry));
}

export function addReviewSubmissionFallback(entry) {
  reviewSubmissions.unshift(withMeta(entry));
}

export function addServiceRequestSubmissionFallback(entry) {
  serviceRequestSubmissions.unshift(withMeta(entry));
}

export function searchContactSubmissionsFallback(search) {
  return contactSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.name, item.email, item.subject || "", item.message])
  );
}

export function searchReviewSubmissionsFallback(search) {
  return reviewSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.author, item.content])
  );
}

export function searchServiceRequestSubmissionsFallback(search) {
  return serviceRequestSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.client, item.service, item.details])
  );
}
