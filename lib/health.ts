export type HealthReport = {
  status: "ok";
  service: string;
  timestamp: string;
  uptime: number;
};

export function buildHealthReport(): HealthReport {
  return {
    status: "ok",
    service: "bloxstar",
    timestamp: new Date().toISOString(),
    uptime: typeof process !== "undefined" && process.uptime ? process.uptime() : 0,
  };
}
