const API_URL = import.meta.env.VITE_API_URL;

export type ApiErrorPayload = {
  error?: { code?: string; message?: string; details?: unknown[] };
};
export class NovaApiError extends Error {
  status: number;
  code?: string;
  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.error?.message || `La requête a échoué (${status})`);
    this.name = 'NovaApiError';
    this.status = status;
    this.code = payload.error?.code;
  }
}

let csrfToken: string | null = null;
export async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  const method = (init.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    csrfToken ||= await getCsrfToken();
    if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });
  if (response.status === 204) return undefined as T;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new NovaApiError(response.status, payload);
  return payload as T;
}
export async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  const response = await fetch(`${API_URL}/auth/csrf`, {
    credentials: 'include',
  });
  if (!response.ok) return null;
  csrfToken = ((await response.json()) as { token?: string }).token || null;
  return csrfToken;
}
export { API_URL };
export const encodeId = (id: string) => encodeURIComponent(id);
export const json = (body: unknown): RequestInit => ({
  method: 'POST',
  body: JSON.stringify(body),
});
export const patchJson = (body: unknown): RequestInit => ({
  method: 'PATCH',
  body: JSON.stringify(body),
});
export const deleteRequest: RequestInit = { method: 'DELETE' };
export const queryString = (
  query: Record<string, string | number | boolean | undefined>,
) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(
    ([key, value]) => value !== undefined && params.set(key, String(value)),
  );
  const result = params.toString();
  return result ? `?${result}` : '';
};

export type { ApiErrorPayload as ApiError };

export default request;
