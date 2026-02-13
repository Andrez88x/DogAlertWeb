import { dbSchema } from "@/lib/schema";
import { DangerReport, Profile, Severity } from "@/lib/types";

export function reportSelectColumns(): string {
  const c = dbSchema.columns.reports;
  return [
    c.id,
    c.userId,
    c.description,
    c.severity,
    c.status,
    c.latitude,
    c.longitude,
    c.imageUrl,
    c.createdAt
  ].join(", ");
}

export function profileSelectColumns(): string {
  const c = dbSchema.columns.profiles;
  return [c.id, c.username, c.dogName, c.dogBreed, c.updatedAt].join(", ");
}

export function normalizeReport(row: Record<string, unknown>): DangerReport {
  const c = dbSchema.columns.reports;
  return {
    id: String(row[c.id]),
    user_id: String(row[c.userId]),
    description: String(row[c.description] ?? ""),
    severity: (row[c.severity] as Severity) ?? "medium",
    status: (row[c.status] as "unconfirmed" | "confirmed" | "resolved") ?? "unconfirmed",
    latitude: Number(row[c.latitude]),
    longitude: Number(row[c.longitude]),
    image_url: (row[c.imageUrl] as string | null) ?? null,
    created_at: String(row[c.createdAt] ?? new Date().toISOString())
  };
}

export function normalizeProfile(row: Record<string, unknown> | null): Profile | null {
  if (!row) return null;
  const c = dbSchema.columns.profiles;
  return {
    id: String(row[c.id]),
    username: (row[c.username] as string | null) ?? null,
    dog_name: (row[c.dogName] as string | null) ?? null,
    dog_breed: (row[c.dogBreed] as string | null) ?? null,
    updated_at: (row[c.updatedAt] as string | undefined) ?? undefined
  };
}
