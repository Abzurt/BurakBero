"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Components
const Greeting = ({ guestName }: { guestName: string }) => (
  <section className="relative h-screen w-full flex items-center justify-center hero-zoom" id="home">
    <Image
      src="/wedding-hero.jpg"
      alt="Wedding Couple"
      fill
      className="object-cover"
      priority
    />
    <div className="relative z-10 glass p-8 md:p-16 max-w-sm md:max-w-xl text-center shadow-2xl animate-fade-in-scale">
      <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">Save our Date</span>
      <h1 className="font-headline text-5xl md:text-7xl mb-4 font-bold text-on-background">Berin & Burak</h1>
      <p className="font-headline italic text-xl md:text-2xl text-primary-dim mb-8">Evleniyoruz!</p>
      <div className="h-[1px] w-12 bg-primary/30 mx-auto mb-8"></div>
      <p className="font-body text-sm md:text-base leading-relaxed tracking-wide text-on-surface-variant">
        Hoş geldin <span className="font-bold text-primary">{guestName}</span>. <br/>
        Hayatımızın en mutlu gününde seni de aramızda görmek istiyoruz.
      </p>
    </div>
  </section>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-06-13T19:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="py-12 bg-surface-container-low h-[180px]" />;

  return (
    <section className="py-12 bg-surface-container-low flex flex-col items-center border-b border-primary/10">
      <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-6">Mutluluğa Kalan Süre</h2>
      <div className="flex gap-3 md:gap-6 justify-center px-4">
        {[
          { label: "Gün", value: timeLeft.days },
          { label: "Saat", value: timeLeft.hours },
          { label: "Dk", value: timeLeft.mins },
          { label: "Sn", value: timeLeft.secs }
        ].map((item, idx) => (
          <div key={idx} className="glass w-16 h-20 md:w-28 md:h-32 flex flex-col items-center justify-center rounded-xl shadow-sm">
            <span className="font-headline text-2xl md:text-4xl text-primary">{item.value}</span>
            <span className="font-label text-[8px] uppercase tracking-widest mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const EventInfo = () => (
  <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto" id="event">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-12">
        <div>
          <h2 className="font-headline text-4xl mb-6 text-on-background">Düğün Günü</h2>
          <p className="font-body text-on-surface-variant leading-relaxed text-lg">
            Sarıyer'in en gözde mekanlarından biri olan Fuat Paşa Yalısı'nda, Boğaz'ın eşsiz manzarasında bu muazzam günü birlikte kutlayalım.
          </p>
        </div>
        <div className="grid gap-8">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <h4 className="font-label font-bold text-sm uppercase tracking-wider mb-1">Ne Zaman</h4>
              <p className="font-headline text-xl">13 Haziran 2026</p>
              <p className="text-on-surface-variant">Cumartesi, 19:00</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined">near_me</span>
            </div>
            <div>
              <h4 className="font-label font-bold text-sm uppercase tracking-wider mb-1">Nerede</h4>
              <p className="font-headline text-xl">Sarıyer Fuat Paşa Yalısı</p>
              <p className="text-on-surface-variant mb-4">Büyükdere, Çayırbaşı Cd. No:148, 34453 Sarıyer/İstanbul</p>
              <a 
                href="https://maps.app.goo.gl/9TzYAnU87pQ2W5uE9" 
                target="_blank"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
              >
                Yol Tarifi Al <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
          alt="Venue"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </section>
);

const Calendar = () => (
  <section className="py-20 bg-primary-container/10 px-6">
    <div className="max-w-3xl mx-auto glass p-10 md:p-16 text-center rounded-3xl">
      <h3 className="font-headline text-3xl mb-4">Takvime Ekle</h3>
      <p className="font-body text-on-surface-variant mb-10">Düğün tarihimizi unutmamak için takvimine şimdiden ekle.</p>
      <div className="flex flex-wrap justify-center gap-4">
        {["Google", "Apple", "Outlook"].map(platform => (
          <button key={platform} className="bg-surface-container-lowest text-on-surface-variant px-6 py-3 rounded-full font-label text-xs uppercase tracking-widest border border-outline-variant/20 hover:bg-white transition-colors">
            {platform}
          </button>
        ))}
      </div>
    </div>
  </section>
);

const RSVPPopup = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting, 
  guestName 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSubmit: (attendance: string, count: number) => void,
  isSubmitting: boolean,
  guestName: string 
}) => {
  const [attendance, setAttendance] = useState("coming");
  const [guestCount, setGuestCount] = useState(1);
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-lg transition-all animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="glass max-w-lg w-full p-8 md:p-12 rounded-[2rem] text-center relative shadow-2xl animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant/40 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="mb-10">
          <h2 className="font-headline text-4xl mb-4 text-on-background">Katılıyor Musun?</h2>
          <p className="font-body text-on-surface-variant">Lütfen katılım durumunu 1 Mayıs'a kadar bildir.</p>
        </div>
        <form className="space-y-8 text-left" onSubmit={(e) => { e.preventDefault(); onSubmit(attendance, guestCount); }}>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer group">
              <input type="radio" name="attendance" value="coming" className="hidden peer" checked={attendance === "coming"} onChange={() => setAttendance("coming")} />
              <div className="text-center p-6 rounded-2xl border border-outline-variant/20 peer-checked:bg-primary-container peer-checked:border-primary transition-all duration-300 glass hover:bg-white/40">
                <span className="font-label text-[10px] uppercase tracking-widest">Geliyorum</span>
              </div>
            </label>
            <label className="flex-1 cursor-pointer group">
              <input type="radio" name="attendance" value="not-coming" className="hidden peer" checked={attendance === "not-coming"} onChange={() => setAttendance("not-coming")} />
              <div className="text-center p-6 rounded-2xl border border-outline-variant/20 peer-checked:bg-surface-container-low transition-all duration-300 glass hover:bg-white/40">
                <span className="font-label text-[10px] uppercase tracking-widest tracking-tighter">Gelemiyorum</span>
              </div>
            </label>
          </div>
          <div className="space-y-4">
            <label className="font-label text-[10px] uppercase tracking-widest text-outline-variant ml-1">Kişi Sayısı</label>
            <div className="flex items-center justify-between glass py-2 px-2 rounded-full border border-outline-variant/10">
              <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">-</button>
              <span className="font-headline text-2xl px-8">{guestCount}</span>
              <button type="button" onClick={() => setGuestCount(guestCount + 1)} className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">+</button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-white font-label text-xs uppercase tracking-[0.3em] font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Gönderiliyor..." : "Cevabı Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function WeddingPage() {
  return (
    <main className="relative">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-surface">Yükleniyor...</div>}>
        <WeddingContent />
      </Suspense>
    </main>
  );
}

function WeddingContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState("Değerli Misafirimiz");
  const [showRSVP, setShowRSVP] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const fetchTriggered = useRef(false);

  useEffect(() => {
    const userId = searchParams.get("u");
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

    if (fetchTriggered.current) return;

    async function fetchGuest() {
      if (!userId || !scriptUrl) {
        setAccessDenied(true);
        setIsLoading(false);
        return;
      }

      fetchTriggered.current = true;
      try {
        const response = await fetch(`${scriptUrl}?u=${userId}`);
        const data = await response.json();
        
        if (data.name && data.name !== "Not found") {
          setGuestName(data.name);
          setAccessDenied(false);
          const isRespondedInSheet = !!(data.status && data.status.trim() !== "");
          setHasResponded(isRespondedInSheet);
        } else {
          setAccessDenied(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setAccessDenied(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuest();
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && !accessDenied) {
      const forceShow = searchParams.get("force") === "true";
      const hasRespondedLocal = localStorage.getItem("rsvp_final_status_v3") === "true";
      
      if ((!hasRespondedLocal && !hasResponded) || forceShow) {
        const timer = setTimeout(() => {
          setShowRSVP(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, accessDenied, hasResponded, searchParams]);

  const handleRSVPSubmit = async (attendance: string, count: number) => {
    const userId = searchParams.get("u");
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

    if (!userId || !scriptUrl) return;

    setIsSubmitting(true);
    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ u: userId, attendance, count }),
      });
      
      setShowRSVP(false);
      localStorage.setItem("rsvp_final_status_v3", "true");
      alert("Cevabınız kaydedildi. Teşekkürler!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRSVPClose = () => {
    setShowRSVP(false);
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-surface font-headline text-xl italic">Yükleniyor...</div>;

  if (accessDenied) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-surface px-6 text-center">
        <div className="glass p-12 rounded-3xl max-w-md shadow-2xl">
          <span className="material-symbols-outlined text-primary text-6xl mb-6">lock</span>
          <h2 className="font-headline text-3xl mb-4 text-on-background">Geçersiz Link</h2>
          <p className="font-body text-on-surface-variant leading-relaxed">
            Üzgünüz, bu davetiye linki geçersiz veya süresi dolmuş. Lütfen size iletilen linki kontrol edin veya bizimle iletişime geçin.
          </p>
          <div className="h-[1px] w-12 bg-primary/20 mx-auto my-8"></div>
          <p className="font-headline italic text-primary-dim italic">Berin & Burak</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Countdown />
      <Greeting guestName={guestName} />
      <RSVPPopup 
        isOpen={showRSVP} 
        onClose={handleRSVPClose} 
        onSubmit={handleRSVPSubmit}
        isSubmitting={isSubmitting}
        guestName={guestName}
      />
      <div className="relative z-10">
        <EventInfo />
        <Calendar />
      </div>
    </>
  );
}
