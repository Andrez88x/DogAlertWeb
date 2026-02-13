export type Severity = "low" | "medium" | "high" | "critical";

export type DangerReport = {
  id: string;
  user_id: string;
  description: string;
  severity: Severity;
  status: "unconfirmed" | "confirmed" | "resolved";
  latitude: number;
  longitude: number;
  image_url: string | null;
  created_at: string;
};

export type ReportConfirmation = {
  id: string;
  report_id: string;
  user_id: string;
  created_at: string;
};

export type Profile = {
  id: string;
  username: string | null;
  dog_name: string | null;
  dog_breed: string | null;
  updated_at?: string;
};
