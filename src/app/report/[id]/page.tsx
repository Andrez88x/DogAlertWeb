"use client";

import { AppShell } from "@/components/layout/app-shell";
import { DynamicReportsMap } from "@/components/map/dynamic-reports-map";
import { ConfirmButton } from "@/components/report/confirm-button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { normalizeReport, reportSelectColumns } from "@/lib/db";
import { dbSchema } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DangerReport } from "@/lib/types";
import { severityClass, severityLabel } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { user, loading } = useAuthUser();

  const [report, setReport] = useState<DangerReport | null>(null);
  const [confirmations, setConfirmations] = useState(0);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const [loadingReport, setLoadingReport] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !reportId) return;
    const supabase = getSupabaseBrowserClient();
    const t = dbSchema.tables;
    const rc = dbSchema.columns.reports;
    const cc = dbSchema.columns.confirmations;
    let active = true;

    async function loadData() {
      setLoadingReport(true);
      setError(null);

      const { data: reportData, error: reportError } = await supabase
        .from(t.dangerReports)
        .select(reportSelectColumns())
        .eq(rc.id, reportId)
        .single();

      if (!active) return;
      if (reportError) {
        setLoadingReport(false);
        setError(reportError.message);
        return;
      }

      setReport(normalizeReport(reportData as Record<string, unknown>) as DangerReport);

      const { count, error: countError } = await supabase
        .from(t.reportConfirmations)
        .select("*", { count: "exact", head: true })
        .eq(cc.reportId, reportId);

      if (!active) return;
      if (countError) {
        setLoadingReport(false);
        setError(countError.message);
        return;
      }
      setConfirmations(count ?? 0);

      const { data: ownConfirmation, error: ownError } = await supabase
        .from(t.reportConfirmations)
        .select(cc.id)
        .eq(cc.reportId, reportId)
        .eq(cc.userId, user.id)
        .maybeSingle();

      if (!active) return;
      if (ownError && ownError.code !== "PGRST116") {
        setLoadingReport(false);
        setError(ownError.message);
        return;
      }

      setAlreadyConfirmed(Boolean(ownConfirmation));
      setLoadingReport(false);
    }

    loadData();
    return () => {
      active = false;
    };
  }, [user, reportId]);

  const confirmationMap = useMemo(() => {
    if (!report) return {};
    return { [report.id]: confirmations };
  }, [report, confirmations]);

  if (loading || !user) {
    return <div className="p-8 text-center text-slate-600">Lade...</div>;
  }

  if (loadingReport) {
    return (
      <AppShell>
        <section className="p-4 sm:p-6">
          <div className="cartoon-card h-80 animate-pulse bg-slate-200" />
        </section>
      </AppShell>
    );
  }

  if (!report) {
    return (
      <AppShell>
        <section className="p-4 sm:p-6">
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Meldung nicht gefunden.
          </p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="space-y-4 p-4 sm:p-6">
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="cartoon-card bg-[#fffef8] p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`pill ${severityClass(report.severity)}`}>
              {severityLabel(report.severity)}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(report.created_at).toLocaleString("de-DE")}
            </span>
          </div>

          <p className="whitespace-pre-wrap text-slate-800">{report.description}</p>
          <p className="mt-2 text-sm font-medium text-slate-600">Bestaetigungen: {confirmations}</p>

          <div className="mt-4">
            <ConfirmButton
              reportId={report.id}
              reportLatitude={report.latitude}
              reportLongitude={report.longitude}
              alreadyConfirmed={alreadyConfirmed}
              onConfirmed={() => {
                setAlreadyConfirmed(true);
                setConfirmations((prev) => prev + 1);
              }}
            />
          </div>
        </div>

        {report.image_url && (
          <div className="cartoon-card overflow-hidden bg-white">
            <Image
              src={report.image_url}
              alt="Meldungsfoto"
              width={1400}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="cartoon-card overflow-hidden bg-white">
          <DynamicReportsMap
            reports={[report]}
            confirmationMap={confirmationMap}
            className="h-[45vh] w-full"
            center={[report.latitude, report.longitude]}
            zoom={15}
          />
        </div>
      </section>
    </AppShell>
  );
}
