"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ReportForm } from "@/components/report/report-form";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewReportPage() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="p-8 text-center text-slate-600">Lade...</div>;
  }

  return (
    <AppShell>
      <section className="p-4 sm:p-6">
        <ReportForm />
      </section>
    </AppShell>
  );
}
