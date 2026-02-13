"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { dbSchema } from "@/lib/schema";
import { Profile } from "@/lib/types";
import { useState } from "react";

type ProfileFormProps = {
  profile: Profile | null;
  userId: string;
  onSaved: (profile: Profile) => void;
};

export function ProfileForm({ profile, userId, onSaved }: ProfileFormProps) {
  const [username, setUsername] = useState(profile?.username ?? "");
  const [dogName, setDogName] = useState(profile?.dog_name ?? "");
  const [dogBreed, setDogBreed] = useState(profile?.dog_breed ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const supabase = getSupabaseBrowserClient();
    const t = dbSchema.tables;
    const pc = dbSchema.columns.profiles;
    const payload: Record<string, unknown> = {
      [pc.id]: userId,
      [pc.username]: username || null,
      [pc.dogName]: dogName || null,
      [pc.dogBreed]: dogBreed || null
    };

    const { data, error: saveError } = await supabase
      .from(t.profiles)
      .upsert(payload)
      .select([pc.id, pc.username, pc.dogName, pc.dogBreed, pc.updatedAt].join(", "))
      .single();

    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }

    onSaved({
      id: String((data as Record<string, unknown>)[pc.id]),
      username: ((data as Record<string, unknown>)[pc.username] as string | null) ?? null,
      dog_name: ((data as Record<string, unknown>)[pc.dogName] as string | null) ?? null,
      dog_breed: ((data as Record<string, unknown>)[pc.dogBreed] as string | null) ?? null,
      updated_at: ((data as Record<string, unknown>)[pc.updatedAt] as string | undefined) ?? undefined
    });
    setSuccess("Profil gespeichert.");
  }

  return (
    <form onSubmit={onSubmit} className="cartoon-card space-y-3 bg-[#fffef8] p-6">
      <h2 className="text-2xl font-extrabold">Profil</h2>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Username</span>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="cartoon-input"
          placeholder="z.B. hunde_freund"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Hundename (optional)</span>
        <input
          type="text"
          value={dogName}
          onChange={(event) => setDogName(event.target.value)}
          className="cartoon-input"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Rasse (optional)</span>
        <input
          type="text"
          value={dogBreed}
          onChange={(event) => setDogBreed(event.target.value)}
          className="cartoon-input"
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        className="cartoon-btn btn-primary px-5 py-2.5 text-white disabled:opacity-60"
      >
        {saving ? "Speichere..." : "Speichern"}
      </button>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>
      )}
    </form>
  );
}
