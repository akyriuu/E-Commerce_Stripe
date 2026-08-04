const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  imageUrl: string | null;
  salesCount: number;
  shareSlug: string;
  published?: boolean;
  author?: { id: string; name: string };
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

function authHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = Array.isArray(err.message)
      ? err.message.join(', ')
      : (err.message ?? 'Erro na requisição');
    throw new Error(message);
  }

  return res.json();
}

export const api = {
  listProducts: () => request<Product[]>('/products'),
  myProducts: () => request<Product[]>('/products/mine'),
  createProduct: (body: {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
  }) =>
    request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  removeProduct: (id: string) =>
    request<{ ok: boolean }>(`/products/${id}`, { method: 'DELETE' }),
  checkout: (productId: string) =>
    request<{ url: string }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    }),
  login: (body: { email: string; password: string }) =>
    request<{ accessToken: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  register: (body: { name: string; email: string; password: string }) =>
    request<{ accessToken: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
