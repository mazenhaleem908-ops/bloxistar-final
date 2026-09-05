import { buildHealthReport } from "../lib/health";

export const config = { runtime: "nodejs" };

export default function handler(request: Request): Response {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "content-type": "application/json", allow: "GET, HEAD" },
    });
  }

  const body = JSON.stringify(buildHealthReport());
  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
