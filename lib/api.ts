// Client HTTP unique vers l'API AlloProf (voir docs/01-BRIEF-FRONTEND.md, section 4).

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const TOKEN_KEY = "alloprof_token";

export type ApiErrorDetails = { champ: string; message: string }[] | string | undefined;

export class ApiError extends Error {
  status: number;
  details: ApiErrorDetails;

  constructor(status: number, message: string, details?: ApiErrorDetails) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }

  /** Erreurs de champ exploitables par react-hook-form (setError). */
  get fieldErrors(): { champ: string; message: string }[] {
    return Array.isArray(this.details) ? this.details : [];
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

// Appelé sur un 401 d'une requête authentifiée. L'AuthProvider le remplace
// pour vider la session et rediriger proprement vers /connexion.
let onUnauthorized: () => void = () => {
  setToken(null);
  window.location.href = "/connexion";
};

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

type Query = Record<string, string | number | boolean | null | undefined>;

interface RequestOptions {
  body?: unknown;
  query?: Query;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: Query) {
  const url = new URL(API_URL + path);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.query), {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0, "Impossible de joindre le serveur. Vérifiez votre connexion.");
  }

  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Session expirée ou invalidée : uniquement si on avait envoyé un token
    // (un 401 sur /auth/login veut dire « identifiants incorrects »).
    if (response.status === 401 && token) onUnauthorized();
    throw new ApiError(
      response.status,
      data?.message ?? "Erreur inattendue du serveur",
      data?.details,
    );
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, query?: Query, signal?: AbortSignal) =>
    request<T>("GET", path, { query, signal }),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, { body }),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, { body }),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, { body }),
  delete: <T = void>(path: string) => request<T>("DELETE", path),
};
