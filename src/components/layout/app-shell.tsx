"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const navItems = [
  { href: "/home", label: "Karte" },
  { href: "/report/new", label: "Melden" },
  { href: "/profile", label: "Profil" }
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-[999] mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
        <div className="cartoon-card flex items-center justify-between bg-[#fffdf4] px-4 py-3">
          <Link href="/home" className="text-lg font-extrabold tracking-tight">
            Dog Alert
          </Link>
          <Link href="/report/new" className="cartoon-btn btn-primary px-4 py-2 text-sm">
            + Meldung
          </Link>
        </div>
      </header>
      <main className="mx-auto min-h-screen w-full max-w-6xl pb-24">{children}</main>
      <nav className="fixed bottom-3 left-0 right-0 z-[999]">
        <ul className="cartoon-card mx-auto flex w-[calc(100%-1.25rem)] max-w-md items-center justify-around bg-white px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold transition ${
                    active
                      ? "border-slate-800 bg-[#1cb0f6] text-white shadow-[0_4px_0_#126a93]"
                      : "border-transparent text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
