import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6">
      <header className="cartoon-card flex items-center justify-between gap-4 bg-white/95 px-5 py-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky-600">Dog Alert Web</p>
          <p className="text-xl font-extrabold">Pfoten-Schutz fuer eure Runden</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/auth" className="cartoon-btn btn-ghost px-4 py-2 text-sm">
            Login
          </Link>
          <Link href="/home" className="cartoon-btn btn-secondary px-4 py-2 text-sm">
            Zur Karte
          </Link>
        </div>
      </header>

      <section className="mt-6 grid items-center gap-6 lg:grid-cols-2">
        <div className="cartoon-card animate-pop bg-[#fff7d9] p-6 sm:p-8">
          <p className="pill inline-block bg-white">Community Warnsystem</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Schuetze Hunde vor
            <span className="text-orange-500"> Giftkoedern</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-700">
            Melde Funde in Sekunden, bestaetige Hinweise vor Ort und informiere andere Halter direkt
            auf der Karte.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/auth" className="cartoon-btn btn-primary px-5 py-3 text-base">
              Jetzt starten
            </Link>
            <Link href="/home" className="cartoon-btn btn-ghost px-5 py-3 text-base">
              Live Meldungen ansehen
            </Link>
          </div>
        </div>

        <div className="cartoon-card animate-pop relative overflow-hidden bg-[#d6f6ff] p-6 [animation-delay:120ms]">
          <div className="animate-floaty mx-auto h-72 w-72 rounded-full border-[6px] border-slate-700 bg-[#fff4cf] p-8">
            <div className="relative h-full w-full rounded-full border-[6px] border-slate-700 bg-[#ffcf8a]">
              <div className="absolute -left-5 top-6 h-14 w-14 rounded-full border-4 border-slate-700 bg-[#ffcf8a]" />
              <div className="absolute -right-5 top-6 h-14 w-14 rounded-full border-4 border-slate-700 bg-[#ffcf8a]" />
              <div className="absolute left-10 top-14 h-6 w-6 rounded-full bg-slate-800" />
              <div className="absolute right-10 top-14 h-6 w-6 rounded-full bg-slate-800" />
              <div className="absolute left-1/2 top-[52%] h-7 w-9 -translate-x-1/2 rounded-b-full rounded-t-xl bg-slate-800" />
              <div className="absolute left-1/2 top-[67%] h-2 w-20 -translate-x-1/2 rounded-full bg-slate-800" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 rounded-xl border-2 border-slate-700 bg-white px-3 py-2 text-sm font-bold">
            + Karte, Reports, Bestaetigungen
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Schnell melden",
            text: "GPS + Foto + Severity in einem Flow fuer mobile und Desktop."
          },
          {
            title: "Vor Ort bestaetigen",
            text: "Nur in Standortnaehe bestaetigen, damit Meldungen verlaesslich bleiben."
          },
          {
            title: "Persoenliches Profil",
            text: "Mit Username und optionalem Hundeprofil alle eigenen Meldungen verwalten."
          }
        ].map((item, index) => (
          <article
            key={item.title}
            className="cartoon-card animate-pop bg-white/95 p-5"
            style={{ animationDelay: `${220 + index * 90}ms` }}
          >
            <h2 className="text-xl font-extrabold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
