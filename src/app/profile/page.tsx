"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProfileForm } from "@/components/profile/profile-form";
import { useAuthUser } from "@/hooks/use-auth-user";
import { normalizeProfile, normalizeReport, profileSelectColumns, reportSelectColumns } from "@/lib/db";
import { dbSchema } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DangerReport, Profile } from "@/lib/types";
import { severityClass, severityLabel } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [myReports, setMyReports] = useState<DangerReport[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    const supabase = getSupabaseBrowserClient();
    const t = dbSchema.tables;
    const pc = dbSchema.columns.profiles;
    const rc = dbSchema.columns.reports;
    let active = true;

    async function loadData() {
      setLoadingData(true);
      setError(null);

      const [profileResult, reportsResult] = await Promise.all([
        supabase
          .from(t.profiles)
          .select(profileSelectColumns())
          .eq(pc.id, user.id)
          .maybeSingle(),
        supabase
          .from(t.dangerReports)
          .select(reportSelectColumns())
          .eq(rc.userId, user.id)
          .order(rc.createdAt, { ascending: false })
      ]);

      if (!active) return;

      if (profileResult.error && profileResult.error.code !== "PGRST116") {
        setError(profileResult.error.message);
        setLoadingData(false);
        return;
      }

      if (reportsResult.error) {
        setError(reportsResult.error.message);
        setLoadingData(false);
        return;
      }

      setProfile(normalizeProfile((profileResult.data ?? null) as Record<string, unknown> | null) as Profile | null);
      setMyReports(
        ((reportsResult.data ?? []) as Array<Record<string, unknown>>).map((row) =>
          normalizeReport(row)
        ) as DangerReport[]
      );
      setLoadingData(false);
    }

    loadData();
    return () => {
      active = false;
    };
  }, [user]);

  async function logout() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  if (loading || !user) {
    return <div className="p-8 text-center text-slate-600">Lade...</div>;
  }

  return (
    <AppShell>
      <section className="space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Profil</h1>
          <button
            type="button"
            onClick={logout}
            className="cartoon-btn btn-ghost px-4 py-2 text-sm"
          >
            Logout
          </button>
        </div>

        {loadingData ? (
          <div className="cartoon-card h-40 animate-pulse bg-slate-200" />
        ) : (
          <ProfileForm profile={profile} userId={user.id} onSaved={setProfile} />
        )}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <section className="cartoon-card bg-[#fffef8] p-6">
          <h2 className="text-2xl font-extrabold">Meine Meldungen</h2>
          <div className="mt-4 space-y-3">
            {myReports.length === 0 && (
              <p className="rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Noch keine Meldungen erstellt.
              </p>
            )}
            {myReports.map((report) => (
              <Link
                key={report.id}
                href={`/report/${report.id}`}
                className="block rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`pill ${severityClass(report.severity)}`}>
                    {severityLabel(report.severity)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(report.created_at).toLocaleString("de-DE")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-700">{report.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
