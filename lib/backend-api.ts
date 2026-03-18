const serverBackendUrl =
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://backend:4000";

const clientBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");

export function getBackendBaseUrl(): string {
  return typeof window === "undefined" ? serverBackendUrl : clientBackendUrl;
}

export async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured for production build.");
  }

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