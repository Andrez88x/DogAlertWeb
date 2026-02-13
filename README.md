# Dog Alert Web

Responsive Web-App (Desktop + Mobile) fuer Giftkoeder-Meldungen mit Next.js, TypeScript, Supabase und OpenStreetMap.

## Tech Stack

- Next.js (App Router) + React
- TypeScript
- Supabase (PostgreSQL + Auth + Storage)
- react-leaflet + OpenStreetMap
- TailwindCSS

## Features (MVP)

- Auth: E-Mail/Passwort Login, Registrierung, Google Sign-In
- Home: Vollbildkarte mit Meldungs-Markern und Bestaetigungsanzahl
- Neue Meldung: GPS-Standort, Foto-Upload, Beschreibung, Severity
- Report Detail: Karte, Foto, Beschreibung, Severity, Bestaetigen in Standortnaehe
- Profil: Username, optionales Hundeprofil (Name/Rasse), eigene Meldungen

## Projektstruktur

```text
src/
  app/
    auth/page.tsx
    home/page.tsx
    report/new/page.tsx
    report/[id]/page.tsx
    profile/page.tsx
    layout.tsx
    globals.css
  components/
    auth/auth-form.tsx
    layout/app-shell.tsx
    map/dynamic-reports-map.tsx
    map/reports-map.tsx
    profile/profile-form.tsx
    report/report-form.tsx
    report/confirm-button.tsx
  hooks/
    use-auth-user.ts
  lib/
    constants.ts
    types.ts
    utils.ts
    supabase/client.ts
```

## Voraussetzungen

- Node.js 18+
- Ein Supabase-Projekt
- In Supabase:
  - Auth Provider: E-Mail + Google
  - Storage Bucket: `report-images` (public)
  - Tabellen: `profiles`, `danger_reports`, `report_confirmations`

## Environment Variablen

1. `.env.example` nach `.env.local` kopieren.
2. Werte setzen:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Optional kannst du bei abweichendem Schema alle Tabellen-/Spaltennamen ueber `NEXT_PUBLIC_DB_*` Variablen in `.env.local` mappen (siehe `.env.example`).

## Start

```bash
npm install
npm run dev
```

Dann im Browser: `http://localhost:3000`

## Hinweise zum Schema

Der Code erwartet in `danger_reports` mindestens:

- `id` (uuid)
- `user_id` (uuid)
- `description` (text)
- `severity` (`low|medium|high|critical`)
- `status` (`unconfirmed|confirmed|resolved`)
- `latitude` (float)
- `longitude` (float)
- `image_url` (text, nullable)
- `created_at` (timestamp)

Und in `report_confirmations`:

- `id` (uuid)
- `report_id` (uuid)
- `user_id` (uuid)
- `created_at` (timestamp)

Und in `profiles`:

- `id` (uuid, = auth user id)
- `username` (text, nullable)
- `dog_name` (text, nullable)
- `dog_breed` (text, nullable)

Wenn dein bestehendes Schema andere Spaltennamen nutzt, passe die `select`/`insert`-Statements in den Seiten-Komponenten an.
