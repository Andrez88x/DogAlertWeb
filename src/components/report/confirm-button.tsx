"use client";

import { CONFIRM_DISTANCE_METERS } from "@/lib/constants";
import { dbSchema } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { distanceInMeters } from "@/lib/utils";
import { useState } from "react";

type ConfirmButtonProps = {
  reportId: string;
  reportLatitude: number;
  reportLongitude: number;
  alreadyConfirmed: boolean;
  onConfirmed: () => void;
};

export function ConfirmButton({
  reportId,
  reportLatitude,
  reportLongitude,
  alreadyConfirmed,
  onConfirmed
}: ConfirmButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmReport() {
    setError(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      setError("Geolocation wird nicht unterstuetzt.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const distance = distanceInMeters(
          position.coords.latitude,
          position.coords.longitude,
          reportLatitude,
          reportLongitude
        );

        if (distance > CONFIRM_DISTANCE_METERS) {
          setLoading(false);
          setError(
            `Du bist zu weit entfernt (${Math.round(distance)}m). Maximal ${CONFIRM_DISTANCE_METERS}m.`
          );
          return;
        }

        const supabase = getSupabaseBrowserClient();
        const t = dbSchema.tables;
        const cc = dbSchema.columns.confirmations;
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          setError("Nicht eingeloggt.");
          return;
        }

        const { error: insertError } = await supabase.from(t.reportConfirmations).insert({
          [cc.reportId]: reportId,
          [cc.userId]: user.id
        });

        setLoading(false);
        if (insertError && insertError.code !== "23505") {
          setError(insertError.message);
          return;
        }

        onConfirmed();
      },
      () => {
        setLoading(false);
        setError("Dein Standort konnte nicht gelesen werden.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  if (alreadyConfirmed) {
    return (
      <p className="rounded-xl border-2 border-green-300 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
        Diese Meldung wurde von dir bestaetigt.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={confirmReport}
        disabled={loading}
        className="cartoon-btn btn-secondary px-5 py-2.5 text-white disabled:opacity-60"
      >
        {loading ? "Pruefe Standort..." : "Bestaetigen"}
      </button>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
