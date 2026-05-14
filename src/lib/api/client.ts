import { config } from "@/lib/config"

export class ApiError extends Error {
  status: number
  body?: unknown
  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown
  /** Indien true, wordt de Authorization header NIET toegevoegd. */
  skipAuth?: boolean
}

/**
 * Eenvoudige fetch-wrapper. Voldoet voor de meeste use-cases en is makkelijk
 * vervangbaar door een SDK (axios, ky, openapi-fetch) zonder dat callers veranderen.
 */
async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { body, skipAuth, headers, ...rest } = opts

  const session = readSession()
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  }
  if (!skipAuth && session?.accessToken) {
    finalHeaders.Authorization = `Bearer ${session.accessToken}`
  }

  const url = config.apiBaseUrl
    ? `${config.apiBaseUrl.replace(/\/$/, "")}${path}`
    : path

  const res = await fetch(url, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  let parsed: unknown = null
  const text = await res.text()
  if (text) {
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = text
    }
  }

  if (!res.ok) {
    const message =
      (parsed as { message?: string } | null)?.message ?? res.statusText
    throw new ApiError(message, res.status, parsed)
  }
  return parsed as T
}

function readSession(): { accessToken: string } | null {
  try {
    const raw = localStorage.getItem(config.storageKey.session)
    return raw ? (JSON.parse(raw) as { accessToken: string }) : null
  } catch {
    return null
  }
}

export const api = {
  get: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "POST", body }),
  put: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "PATCH", body }),
  del: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "DELETE" }),
}
