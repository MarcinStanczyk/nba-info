const serverBackendUrl =
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

const clientBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export function getBackendBaseUrl(): string {
  return typeof window === "undefined" ? serverBackendUrl : clientBackendUrl;
}

export async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${getBackendBaseUrl()}${normalizedPath}`, {
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