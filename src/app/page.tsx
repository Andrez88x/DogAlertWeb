/**
 * Dog Alert - Comic Style Landing Page
 * 
 * Design: Playful Doodle Comic Stil
 * Farben: Orange, Grün, Gelb, Creme
 * Fonts: Architects Daughter (Headlines), Nunito (Body)
 */

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Camera, Bell, CheckCircle, Heart, Paw, Shield, Users } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier könntet ihr später einen Newsletter oder Early Access umsetzen
    alert('Danke! Wir melden uns bald! 🐕');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b-4 border-black shadow-[4px_4px_0px_0px_#000]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐕</span>
            <span className="font-comic text-2xl font-bold text-[#2D3436]">Dog Alert</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="font-bold text-[#2D3436] hover:text-[#FF6B35] transition-colors">Features</a>
            <a href="#how-it-works" className="font-bold text-[#2D3436] hover:text-[#FF6B35] transition-colors">So geht's</a>
            <a href="#app" className="font-bold text-[#2D3436] hover:text-[#FF6B35] transition-colors">Die App</a>
            <Link href="/auth" className="bg-[#FF6B35] text-white px-5 py-2 rounded-full font-bold border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
              Loslegen!
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Dekorative Comic-Elemente */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 transform -rotate-12">🐕</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 transform rotate-12">🦴</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20">🐾</div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Comic-Bubble Hero */}
          <div className="bg-white border-4 border-black rounded-[30px] p-8 shadow-[8px_8px_0px_0px_#000] inline-block mb-8 relative">
            <span className="absolute -top-6 -right-6 text-5xl">💬</span>
            <h1 className="font-comic text-4xl md:text-6xl font-black text-[#2D3436] leading-tight">
              Schütze deinen Hund
              <br />
              <span className="text-[#FF6B35]">vor Giftködern!</span> 🐕
            </h1>
            <p className="mt-4 text-lg text-[#636E72] max-w-xl mx-auto">
              Die Community-App, die Hundebesitzer zusammenbringt. 
              Melde Gefahren, werde gewarnt, rette Leben.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth" className="bg-[#FF6B35] text-white text-xl px-8 py-4 rounded-full font-bold border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000] transition-all">
              🚀 Jetzt starten
            </Link>
            <Link href="#how-it-works" className="bg-[#4ECDC4] text-[#2D3436] text-xl px-8 py-4 rounded-full font-bold border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000] transition-all">
              Wie es funktioniert
            </Link>
          </div>

          {/* Hund-Bild Platzhalter */}
          <div className="mt-12 relative inline-block">
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-[#FFE66D] to-[#FF6B35] rounded-full border-4 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center">
              <span className="text-8xl md:text-9xl">🐕‍🦺</span>
            </div>
            <span className="absolute -bottom-2 -right-2 text-4xl">✨</span>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-comic text-4xl md:text-5xl font-black text-center text-[#2D3436] mb-4">
            Was wir können! 🦴
          </h2>
          <p className="text-center text-[#636E72] text-lg mb-12 max-w-2xl mx-auto">
            Alles was du brauchst, um deinen Vierbeiner sicher zu halten
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Gefahr melden</h3>
              <p className="text-[#636E72]">
                Siehst du einen Giftköder? Sofort melden mit GPS-Standort. 
                Andere Hundebesitzer werden sofort gewarnt!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#4ECDC4] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Foto hochladen</h3>
              <p className="text-[#636E72]">
                Mach ein Foto der Gefahrenstelle. Je genauer, 
                desto besser können andere Hundebesitzer aufpassen!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#FFE66D] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Bell className="w-8 h-8 text-[#2D3436]" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Sofort gewarnt</h3>
              <p className="text-[#636E72]">
                Push-Benachrichtigung, wenn in deiner Nähe 
                eine neue Gefahr gemeldet wird. Schütze deinen Hund!
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Bestätigen</h3>
              <p className="text-[#636E72]">
                Andere können Meldungen bestätigen. 
                Mehr Bestätigungen = höhere Zuverlässigkeit!
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#4ECDC4] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Gemeinschaft</h3>
              <p className="text-[#636E72]">
                Wir sind alle Hundeeltern. Zusammen sind wir stärker 
                und schützen mehr Hunde vor Gefahren!
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] transition-all">
              <div className="w-16 h-16 bg-[#FFE66D] rounded-full border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Shield className="w-8 h-8 text-[#2D3436]" />
              </div>
              <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">Sicherheit</h3>
              <p className="text-[#636E72]">
                Meldungen laufen nach 7 Tagen automatisch ab. 
                Nur aktuelle Gefahren werden angezeigt!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 px-4 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-comic text-4xl md:text-5xl font-black text-center text-[#2D3436] mb-4">
            So funktioniert's! 🐾
          </h2>
          <p className="text-center text-[#636E72] text-lg mb-12">
            Einfach wie 1-2-3! Aber mit mehr Schritten. Und Hunden. 🐕
          </p>

          {/* Schritte als Comic-Panels */}
          <div className="space-y-6">
            {/* Schritt 1 */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full border-4 border-black flex items-center justify-center font-comic text-2xl font-bold text-white shadow-[4px_4px_0px_0px_#000] shrink-0">
                1
              </div>
              <div className="bg-white border-4 border-black rounded-[20px] p-5 shadow-[6px_6px_0px_0px_#000] flex-1">
                <h3 className="font-comic text-xl font-bold text-[#2D3436] mb-1">📍 Gefahr entdeckt</h3>
                <p className="text-[#636E72]">
                  Du siehst einen verdächtigen Köder im Park? Keine Panik - mach ein Foto und markiere den Standort!
                </p>
              </div>
              <span className="text-4xl hidden md:block">🐕</span>
            </div>

            {/* Pfeil */}
            <div className="flex justify-center">
              <span className="text-3xl text-[#FF6B35]">⬇️</span>
            </div>

            {/* Schritt 2 */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 bg-[#4ECDC4] rounded-full border-4 border-black flex items-center justify-center font-comic text-2xl font-bold text-white shadow-[4px_4px_0px_0px_#000] shrink-0">
                2
              </div>
              <div className="bg-white border-4 border-black rounded-[20px] p-5 shadow-[6px_6px_0px_0px_#000] flex-1">
                <h3 className="font-comic text-xl font-bold text-[#2D3436] mb-1">📸 Meldung erstellen</h3>
                <p className="text-[#636E72]">
                  Beschreibe was du gesehen hast. Je detaillierter, desto besser können andere Hundebesitzer aufpassen!
                </p>
              </div>
              <span className="text-4xl hidden md:block">📱</span>
            </div>

            {/* Pfeil */}
            <div className="flex justify-center">
              <span className="text-3xl text-[#4ECDC4]">⬇️</span>
            </div>

            {/* Schritt 3 */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 bg-[#FFE66D] rounded-full border-4 border-black flex items-center justify-center font-comic text-2xl font-bold text-[#2D3436] shadow-[4px_4px_0px_0px_#000] shrink-0">
                3
              </div>
              <div className="bg-white border-4 border-black rounded-[20ray p-5 shadow-[6px_6px_0px_0px_#000] flex-1">
                <h3 className="font-comic text-xl font-bold text-[#2D3436] mb-1">✅ Community bestätigt</h3>
                <p className="text-[#636E72]">
                  Andere Hundebesitzer in der Nähe können die Meldung bestätigen. 
                  Mehr Bestätigungen = vertrauenswürdiger!
                </p>
              </div>
              <span className="text-4xl hidden md:block">🤝</span>
            </div>

            {/* Pfeil */}
            <div className="flex justify-center">
              <span className="text-3xl text-[#FFE66D]">⬇️</span>
            </div>

            {/* Schritt 4 */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full border-4 border-black flex items-center justify-center font-comic text-2xl font-bold text-white shadow-[4px_4px_0px_0px_#000] shrink-0">
                4
              </div>
              <div className="bg-white border-4 border-black rounded-[20px] p-5 shadow-[6px_6px_0px_0px_#000] flex-1">
                <h3 className="font-comic text-xl font-bold text-[#2D3436] mb-1">🔔 Alle werden gewarnt</h3>
                <p className="text-[#636E72]">
                  Sofortige Push-Benachrichtigung an alle Hundebesitzer in der Nähe! 
                  Gemeinsam sind wir stark! 💪
                </p>
              </div>
              <span className="text-4xl hidden md:block">🎉</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMING SOON - APP ===== */}
      <section id="app" className="py-20 px-4 bg-gradient-to-br from-[#FF6B35] to-[#FFE66D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-comic text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[4px_4px_0px_#000]">
            🚀 Die App kommt bald!
          </h2>
          <p className="text-white text-xl mb-8 font-bold">
            Petze auch unterwegs - mit unserer mobilen App!
          </p>

          {/* Phone Mockups */}
          <div className="flex justify-center items-end gap-4 md:gap-8 mb-8">
            {/* iOS */}
            <div className="relative">
              <div className="w-40 h-72 md:w-48 md:h-80 bg-[#2D3436] rounded-[30px] border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center">
                <div className="w-32 h-56 md:w-40 md:h-64 bg-white rounded-[20px] overflow-hidden flex items-center justify-center">
                  <span className="text-5xl md:text-6xl">🍎</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full font-bold text-sm">
                iOS
              </div>
              <span className="absolute -top-4 -right-4 text-4xl">📱</span>
            </div>

            {/* Android */}
            <div className="relative">
              <div className="w-40 h-72 md:w-48 md:h-80 bg-[#2D3436] rounded-[30px] border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center">
                <div className="w-32 h-56 md:w-40 md:h-64 bg-white rounded-[20px] overflow-hidden flex items-center justify-center">
                  <span className="text-5xl md:text-6xl">🤖</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#3DDC84] text-white px-4 py-1 rounded-full font-bold text-sm">
                Android
              </div>
              <span className="absolute -top-4 -left-4 text-4xl">📱</span>
            </div>
          </div>

          <p className="text-white/90 text-lg mb-8">
            📱 iOS & Android App in Entwicklung<br/>
            🔔 Push-Benachrichtigungen in Echtzeit<br/>
            📍 GPS-Tracking für unterwegs
          </p>

          {/* Newsletter/Early Access */}
          <div className="bg-white border-4 border-black rounded-[20px] p-6 shadow-[8px_8px_0px_0px_#000] max-w-md mx-auto">
            <h3 className="font-comic text-2xl font-bold text-[#2D3436] mb-2">
              🔔 Erinner mich!
            </h3>
            <p className="text-[#636E72] mb-4">
              Wir benachrichtigen dich, sobald die App live ist!
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="flex-1 px-4 py-3 rounded-full border-3 border-black focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30"
              />
              <button 
                type="submit"
                className="bg-[#FF6B35] text-white px-6 py-3 rounded-full font-bold border-3 border-black hover:bg-[#e55a2b] transition-colors"
              >
                Speichern
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-comic text-4xl md:text-5xl font-black text-center text-[#2D3436] mb-12">
            Was Hundebesitzer sagen! 🐕‍🦺
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-[#636E72] mb-4">
                "Mein Bello wurde zum Held! Dank Dog Alert haben wir 
                zusammen einen Giftköder im Park entdeckt und gemeldet. 
                So viele Hundebesitzer wurden gewarnt!"
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐕</span>
                <span className="font-bold">Max & Bello</span>
              </div>
            </div>

            <div className="bg-[#FFF8F0] border-4 border-black rounded-[20px] p-6 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-[#636E72] mb-4">
                "Endlich eine App, die funktioniert! Einfach zu bedienen, 
                schnell und zuverlässig. Die Community ist super aktiv!"
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐩</span>
                <span className="font-bold">Sarah & Luna</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-4 bg-[#4ECDC4]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-comic text-4xl md:text-5xl font-black text-white mb-4">
            Bereit, mitzumachen? 🐾
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Schließe dich der Community an und schütze Hunde in deiner Nähe!
          </p>
          <Link href="/auth" className="inline-block bg-white text-[#2D3436] text-xl px-10 py-4 rounded-full font-bold border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000] transition-all">
            🚀 Kostenlos registrieren
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2D3436] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🐕</span>
                <span className="font-comic text-2xl font-bold">Dog Alert</span>
              </div>
              <p className="text-white/70">
                Gemeinsam schützen wir unsere Hunde vor Giftködern.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#features" className="hover:text-[#FF6B35]">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#FF6B35]">So geht's</a></li>
                <li><a href="#app" className="hover:text-[#FF6B35]">Die App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-[#FF6B35]">Datenschutz</a></li>
                <li><a href="#" className="hover:text-[#FF6B35]">Impressum</a></li>
                <li><a href="#" className="hover:text-[#FF6B35]">AGB</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Folge uns</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-[#FF6B35]">📘</a>
                <a href="#" className="hover:text-[#FF6B35]">📸</a>
                <a href="#" className="hover:text-[#FF6B35]">🐦</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/50">
            <p>© 2026 Dog Alert. Made with ❤️ for dogs everywhere. 🐕</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
