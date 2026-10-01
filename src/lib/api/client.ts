import axios, {
  AxiosError,
  type AxiosRequestConfig,
} from 'axios';

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
  config: AxiosRequestConfig = {},
): Promise<T> {
  const method = (config.method || 'GET').toUpperCase();
  const headers: Record<string, string> = { ...(config.headers as Record<string, string>) };
  if (method !== 'GET' && method !== 'HEAD') {
    csrfToken ||= await getCsrfToken();
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken;
  }
  try {
    const response = await axios.request<T>({
      ...config,
      url: `${API_URL}${path}`,
      headers,
      withCredentials: true,
      validateStatus: () => true,
    });
    if (response.status === 204) return undefined as T;
    if (response.status < 200 || response.status >= 300)
      throw new NovaApiError(
        response.status,
        response.data as ApiErrorPayload,
      );
    return response.data;
  } catch (error) {
    if (error instanceof NovaApiError) throw error;
    if (error instanceof AxiosError && error.response)
      throw new NovaApiError(error.response.status, error.response.data);
    throw error;
  }
}
export async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  try {
    const response = await axios.get<{ token?: string }>(
      `${API_URL}/auth/csrf`,
      {
        withCredentials: true,
      },
    );
    csrfToken = response.data.token || null;
  } catch {
    csrfToken = null;
  }
  return csrfToken;
}
export { API_URL };
export const encodeId = (id: string) => encodeURIComponent(id);
export const json = (body: unknown): AxiosRequestConfig => ({
  method: 'POST',
  data: body,
});
export const patchJson = (body: unknown): AxiosRequestConfig => ({
  method: 'PATCH',
  data: body,
});
export const deleteRequest: AxiosRequestConfig = { method: 'DELETE' };
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
