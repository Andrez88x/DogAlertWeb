"use client";

import { DangerReport } from "@/lib/types";
import { severityLabel } from "@/lib/utils";
import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRouter } from "next/navigation";

type ReportsMapProps = {
  reports: DangerReport[];
  confirmationMap: Record<string, number>;
  center?: [number, number];
  zoom?: number;
  className?: string;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export function ReportsMap({
  reports,
  confirmationMap,
  center = [52.52, 13.405],
  zoom = 12,
  className = "h-[70vh] w-full"
}: ReportsMapProps) {
  const router = useRouter();

  const initialCenter = useMemo<[number, number]>(() => {
    if (reports.length > 0) {
      return [reports[0].latitude, reports[0].longitude];
    }
    return center;
  }, [reports, center]);

  return (
    <MapContainer center={initialCenter} zoom={zoom} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => {
        const confirmations = confirmationMap[report.id] ?? 0;
        return (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => router.push(`/report/${report.id}`)
            }}
          >
            <Popup>
              <p className="font-semibold">Meldung</p>
              <p className="text-sm">Severity: {severityLabel(report.severity)}</p>
              <p className="text-sm">Bestaetigungen: {confirmations}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
