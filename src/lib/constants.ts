import { Severity } from "@/lib/types";

export const SEVERITY_OPTIONS: Array<{
  value: Severity;
  label: string;
  colorClass: string;
}> = [
  { value: "low", label: "Niedrig", colorClass: "bg-green-500" },
  { value: "medium", label: "Mittel", colorClass: "bg-yellow-500" },
  { value: "high", label: "Hoch", colorClass: "bg-orange-500" },
  { value: "critical", label: "Kritisch", colorClass: "bg-red-600" }
];

export const CONFIRM_DISTANCE_METERS = 300;
