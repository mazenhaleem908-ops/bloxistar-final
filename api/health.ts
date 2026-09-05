import { buildHealthReport } from "../lib/health";

type HealthRequest = {
  method?: string;
};

type HealthResponse = {
  status: (code: number) => HealthResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

// Vercel serverless health check. Lives at the repository root on purpose:
// Vercel zero-config picks up api/*.ts as standalone functions.
export default function handler(req: HealthRequest, res: HealthResponse): void {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const report = buildHealthReport();
  if (req.method === "HEAD") {
    res.status(200).end();
    return;
  }
  res.status(200).json(report);
}
