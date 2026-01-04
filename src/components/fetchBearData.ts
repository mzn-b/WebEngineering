import type { Bear } from "./BearData.tsx";

const backendBaseUrl = "http://localhost:8080/api/wiki";

const fetchJson = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} on ${url}`);
  }
  return (await resp.json()) as T;
};

export const fetchImageUrl = async (
  fileName?: string,
): Promise<string | undefined> => {
  if (!fileName) return undefined;

  try {
    const url =
      `${backendBaseUrl}/image-url?` +
      new URLSearchParams({ fileName }).toString();

    const data = await fetchJson<{ url: string | null }>(url);

    return data.url ?? undefined;
  } catch {
    return undefined;
  }
};

export const fetchBearData = async (): Promise<Bear[]> => {
  const url = `${backendBaseUrl}/bears`;
  return await fetchJson<Bear[]>(url);
};
