type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
};

type ReviewSubmission = {
  id: string;
  createdAt: string;
  author: string;
  content: string;
};

type ServiceRequestSubmission = {
  id: string;
  createdAt: string;
  client: string;
  service: string;
  details: string;
};

const contactSubmissions: ContactSubmission[] = [];
const reviewSubmissions: ReviewSubmission[] = [];
const serviceRequestSubmissions: ServiceRequestSubmission[] = [];

function unsafeSearchMatches(value: string, fields: string[]) {
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

function newId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

export function addContactSubmissionFallback(entry: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  contactSubmissions.unshift({
    id: newId(),
    createdAt: new Date().toISOString(),
    ...entry,
  });
}

export function addReviewSubmissionFallback(entry: {
  author: string;
  content: string;
}) {
  reviewSubmissions.unshift({
    id: newId(),
    createdAt: new Date().toISOString(),
    ...entry,
  });
}

export function addServiceRequestSubmissionFallback(entry: {
  client: string;
  service: string;
  details: string;
}) {
  serviceRequestSubmissions.unshift({
    id: newId(),
    createdAt: new Date().toISOString(),
    ...entry,
  });
}

export function searchContactSubmissionsFallback(search: string) {
  return contactSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.name, item.email, item.subject || "", item.message])
  );
}

export function searchReviewSubmissionsFallback(search: string) {
  return reviewSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.author, item.content])
  );
}

export function searchServiceRequestSubmissionsFallback(search: string) {
  return serviceRequestSubmissions.filter((item) =>
    unsafeSearchMatches(search, [item.client, item.service, item.details])
  );
}
