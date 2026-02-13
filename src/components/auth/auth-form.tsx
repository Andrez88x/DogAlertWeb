"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = getSupabaseBrowserClient();

    if (mode === "login") {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      setLoading(false);
      if (loginError) {
        setError(loginError.message);
        return;
      }
      router.replace("/home");
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setMessage("Registrierung erfolgreich. Bitte E-Mail bestaetigen und dann einloggen.");
    setMode("login");
  }

  async function signInGoogle() {
    setLoading(true);
    setError(null);
    const supabase = getSupabaseBrowserClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`
      }
    });
    setLoading(false);
    if (oauthError) {
      setError(oauthError.message);
    }
  }

  return (
    <div className="cartoon-card mx-auto mt-8 w-full max-w-md bg-[#fffef8] p-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dog Alert</h1>
      <p className="mt-2 text-sm text-slate-600">
        Giftkoeder-Meldungen fuer deine Umgebung. Login oder erstelle ein Konto.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border-2 border-sky-200 bg-sky-50 p-1.5">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-xl px-3 py-2 text-sm font-extrabold ${
            mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-xl px-3 py-2 text-sm font-extrabold ${
            mode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
          }`}
        >
          Registrierung
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-slate-700">E-Mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="cartoon-input"
            placeholder="dein.name@mail.de"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-bold text-slate-700">Passwort</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="cartoon-input"
            placeholder="mind. 6 Zeichen"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="cartoon-btn btn-primary w-full px-4 py-2.5 text-white disabled:opacity-60"
        >
          {loading ? "Bitte warten..." : mode === "login" ? "Einloggen" : "Registrieren"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">oder</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={signInGoogle}
        className="cartoon-btn btn-ghost w-full px-4 py-2.5 text-slate-800 disabled:opacity-60"
      >
        Mit Google anmelden
      </button>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {message && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
      )}
    </div>
  );
}
