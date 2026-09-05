export type HealthReport = {
  ok: true;
  service: "bloxstar";
  uptimeSeconds: number;
  timestamp: string;
};

const startedAt = Date.now();

export function buildHealthReport(): HealthReport {
  return {
    ok: true,
    service: "bloxstar",
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  };
}
