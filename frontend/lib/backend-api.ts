const DEFAULT_PRODUCTION_BACKEND_URL =
  "https://nba-info-gkebftgnhhcthxe7.polandcentral-01.azurewebsites.net";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const defaultBackendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : DEFAULT_PRODUCTION_BACKEND_URL;

const serverBackendUrl = normalizeBaseUrl(
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? defaultBackendUrl,
);

const clientBackendUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_BACKEND_URL ?? defaultBackendUrl,
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