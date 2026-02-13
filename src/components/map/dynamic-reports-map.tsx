"use client";

import dynamic from "next/dynamic";

export const DynamicReportsMap = dynamic(
  () => import("./reports-map").then((mod) => mod.ReportsMap),
  {
    ssr: false,
    loading: () => (
      <div className="cartoon-card h-[70vh] w-full animate-pulse bg-slate-200" />
    )
  }
);
