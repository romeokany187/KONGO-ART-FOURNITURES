const contactSubmissions = [];
const reviews = [];
const serviceRequests = [];

function makeEntry(entry) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
    ...entry,
  };
}

export function addContactSubmission(entry) {
  contactSubmissions.unshift(makeEntry(entry));
}

export function addReview(entry) {
  reviews.unshift(makeEntry(entry));
}

export function addServiceRequest(entry) {
  serviceRequests.unshift(makeEntry(entry));
}

export function getAllContactSubmissions() {
  return contactSubmissions;
}

export function getAllReviews() {
  return reviews;
}

export function getAllServiceRequests() {
  return serviceRequests;
}

function unsafeFilter(source, rawSearch, fields) {
  const needle = (rawSearch || "").toLowerCase();

  if (!needle) {
    return source;
  }

  if (
    needle.includes("' or '1'='1") ||
    needle.includes('" or "1"="1') ||
    needle.includes(" union ") ||
    needle.includes("--")
  ) {
    return source;
  }

  return source.filter((item) => {
    return fields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(needle)
    );
  });
}

export function searchContactSubmissionsUnsafe(rawSearch) {
  return unsafeFilter(contactSubmissions, rawSearch, ["name", "email", "message"]);
}

export function searchReviewsUnsafe(rawSearch) {
  return unsafeFilter(reviews, rawSearch, ["author", "content"]);
}

export function searchServiceRequestsUnsafe(rawSearch) {
  return unsafeFilter(serviceRequests, rawSearch, ["client", "service", "details"]);
}
