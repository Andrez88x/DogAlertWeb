"use client";

import { SEVERITY_OPTIONS } from "@/lib/constants";
import { dbSchema } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Severity } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ReportForm() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [photo, setPhoto] = useState<File | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoadingLocation(false);
      setError("Geolocation wird von deinem Browser nicht unterstuetzt.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoadingLocation(false);
      },
      () => {
        setLoadingLocation(false);
        setError("Standort konnte nicht ermittelt werden. Bitte Browser-Berechtigung pruefen.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingSubmit(true);
    setError(null);

    if (latitude === null || longitude === null) {
      setLoadingSubmit(false);
      setError("Kein GPS-Standort vorhanden.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const t = dbSchema.tables;
    const rc = dbSchema.columns.reports;

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      setLoadingSubmit(false);
      setError("Nicht eingeloggt.");
      return;
    }

    let imageUrl: string | null = null;
    if (photo) {
      const filePath = `${user.id}/${Date.now()}-${photo.name}`;
      const { error: uploadError } = await supabase.storage
        .from(dbSchema.storage.reportImagesBucket)
        .upload(filePath, photo, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        setLoadingSubmit(false);
        setError(`Foto-Upload fehlgeschlagen: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage.from(dbSchema.storage.reportImagesBucket).getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const { data: inserted, error: insertError } = await supabase
      .from(t.dangerReports)
      .insert({
        [rc.userId]: user.id,
        [rc.description]: description,
        [rc.severity]: severity,
        [rc.status]: dbSchema.values.reportStatusUnconfirmed,
        [rc.latitude]: latitude,
        [rc.longitude]: longitude,
        [rc.imageUrl]: imageUrl
      })
      .select(rc.id)
      .single();

    setLoadingSubmit(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    const insertedId = String((inserted as Record<string, unknown>)[rc.id]);
    router.replace(`/report/${insertedId}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="cartoon-card mx-auto mt-6 w-full max-w-2xl space-y-4 bg-[#fffef8] p-6"
    >
      <h1 className="text-3xl font-extrabold">Neue Meldung</h1>
      <p className="text-sm text-slate-600">Meldung wird zuerst als unbestaetigt gespeichert.</p>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Beschreibung</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={4}
          className="cartoon-input"
          placeholder="Was wurde beobachtet? Ort, Hinweise, Zeitpunkt..."
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Severity</span>
        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value as Severity)}
          className="cartoon-input"
        >
          {SEVERITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Foto</span>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          className="cartoon-input"
        />
      </label>

      <div className="rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-sm font-bold text-slate-700">
        {loadingLocation && "GPS-Standort wird ermittelt..."}
        {!loadingLocation && latitude && longitude && (
          <span>
            Standort: {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loadingSubmit || loadingLocation}
        className="cartoon-btn btn-primary w-full px-4 py-2.5 text-white disabled:opacity-60"
      >
        {loadingSubmit ? "Sende..." : "Meldung absenden"}
      </button>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </form>
  );
}
