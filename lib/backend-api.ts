const DEFAULT_PRODUCTION_BACKEND_URL =
  "https://nba-info-gkebftgnhhcthxe7.polandcentral-01.azurewebsites.net";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const defaultServerBackendUrl =
  process.env.NODE_ENV === "development" ? "http://backend:4000" : DEFAULT_PRODUCTION_BACKEND_URL;

const defaultClientBackendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : DEFAULT_PRODUCTION_BACKEND_URL;

const serverBackendUrl = normalizeBaseUrl(
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? defaultServerBackendUrl,
);

const clientBackendUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_BACKEND_URL ?? defaultClientBackendUrl,
);

export function getBackendBaseUrl(): string {
  return typeof window === "undefined" ? serverBackendUrl : clientBackendUrl;
}

export async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getBackendBaseUrl();

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${baseUrl}${normalizedPath}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}