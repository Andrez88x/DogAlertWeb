"use client";

import { AppShell } from "@/components/layout/app-shell";
import { DynamicReportsMap } from "@/components/map/dynamic-reports-map";
import { useAuthUser } from "@/hooks/use-auth-user";
import { normalizeReport, reportSelectColumns } from "@/lib/db";
import { dbSchema } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DangerReport } from "@/lib/types";
import { severityClass, severityLabel } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [reports, setReports] = useState<DangerReport[]>([]);
  const [confirmationMap, setConfirmationMap] = useState<Record<string, number>>({});
  const [loadingReports, setLoadingReports] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    const supabase = getSupabaseBrowserClient();
    let active = true;

    async function loadReports() {
      setLoadingReports(true);
      setError(null);
      const t = dbSchema.tables;
      const rc = dbSchema.columns.reports;
      const cc = dbSchema.columns.confirmations;

      const { data: reportData, error: reportError } = await supabase
        .from(t.dangerReports)
        .select(reportSelectColumns())
        .order(rc.createdAt, { ascending: false });

      if (!active) return;
      if (reportError) {
        setLoadingReports(false);
        setError(reportError.message);
        return;
      }

      const typedReports = (reportData ?? []).map((row) =>
        normalizeReport(row as Record<string, unknown>)
      ) as DangerReport[];
      setReports(typedReports);

      if (typedReports.length === 0) {
        setConfirmationMap({});
        setLoadingReports(false);
        return;
      }

      const reportIds = typedReports.map((r) => r.id);
      const { data: confData, error: confError } = await supabase
        .from(t.reportConfirmations)
        .select(cc.reportId)
        .in(cc.reportId, reportIds);

      if (!active) return;
      if (confError) {
        setLoadingReports(false);
        setError(confError.message);
        return;
      }

      const counts = (confData ?? []).reduce<Record<string, number>>((acc, row) => {
        const reportId = String((row as Record<string, unknown>)[cc.reportId]);
        acc[reportId] = (acc[reportId] ?? 0) + 1;
        return acc;
      }, {});
      setConfirmationMap(counts);
      setLoadingReports(false);
    }

    loadReports();

    return () => {
      active = false;
    };
  }, [user]);

  const reportCards = useMemo(() => reports.slice(0, 6), [reports]);

  if (loading || !user) {
    return <div className="p-8 text-center text-slate-600">Lade...</div>;
  }

  return (
    <AppShell>
      <section className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Aktuelle Meldungen</h1>
          <Link
            href="/report/new"
            className="cartoon-btn btn-primary inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white"
            aria-label="Neue Meldung"
          >
            +
          </Link>
        </div>

        {loadingReports ? (
          <div className="cartoon-card h-[70vh] animate-pulse bg-slate-200" />
        ) : (
          <DynamicReportsMap reports={reports} confirmationMap={confirmationMap} />
        )}

        {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {reportCards.map((report) => (
            <Link
              key={report.id}
              href={`/report/${report.id}`}
              className="cartoon-card p-4 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`pill ${severityClass(report.severity)}`}>
                  {severityLabel(report.severity)}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(report.created_at).toLocaleString("de-DE")}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{report.description}</p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Bestaetigungen: {confirmationMap[report.id] ?? 0}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
