// API client functions for frontend usage

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

async function apiFetch(url: string, options: FetchOptions = {}) {
  const { method = "GET", body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API Error");
  }

  return data;
}

// Products API
export const productsApi = {
  getAll: (category?: string, skip?: number, take?: number) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (skip) params.append("skip", skip.toString());
    if (take) params.append("take", take.toString());

    return apiFetch(`/api/products?${params}`);
  },

  getById: (id: string) => apiFetch(`/api/products/${id}`),

  create: (data: any) =>
    apiFetch("/api/products", {
      method: "POST",
      body: data,
    }),

  update: (id: string, data: any) =>
    apiFetch(`/api/products/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string) =>
    apiFetch(`/api/products/${id}`, {
      method: "DELETE",
    }),
};

// Cart API
export const cartApi = {
  get: () => apiFetch("/api/cart"),

  addItem: (productId: string, quantity: number) =>
    apiFetch("/api/cart", {
      method: "POST",
      body: { productId, quantity },
    }),

  updateItem: (cartItemId: string, quantity: number) =>
    apiFetch(`/api/cart/${cartItemId}`, {
      method: "PUT",
      body: { quantity },
    }),

  removeItem: (cartItemId: string) =>
    apiFetch(`/api/cart/${cartItemId}`, {
      method: "DELETE",
    }),
};

// Orders API
export const ordersApi = {
  getAll: () => apiFetch("/api/orders"),

  getById: (id: string) => apiFetch(`/api/orders/${id}`),

  create: (shippingAddress: string, paymentMethod: string) =>
    apiFetch("/api/orders", {
      method: "POST",
      body: { shippingAddress, paymentMethod },
    }),

  updateStatus: (id: string, status: string) =>
    apiFetch(`/api/orders/${id}`, {
      method: "PUT",
      body: { status },
    }),
};
