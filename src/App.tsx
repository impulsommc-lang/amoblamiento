import React, { useState, useRef, useEffect } from 'react';

// Declare fbq as a global to avoid TypeScript errors when firing pixel events
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Clock,
  Layout,
  X,
  Copy,
  Smartphone,
  CreditCard,
  MessageCircle,
  BookOpen,
  Bot,
  Camera,
  Video
} from 'lucide-react';

// --- Components ---

const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'bank'>('qr');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const whatsappMessage = encodeURIComponent("Hola, acabo de realizar el pago de S/ 97 para el curso de Amoblamiento con IA. Aquí te adjunto mi comprobante para el acceso.");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal — full-height on mobile, auto on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative z-10 bg-white w-full md:max-w-lg md:rounded-[12px] rounded-t-[16px] border-2 border-gold shadow-2xl flex flex-col"
            style={{ maxHeight: '100dvh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
              <h3 className="text-base font-extrabold text-black leading-tight">
                Realiza tu pago único de{' '}
                <span className="text-gold">S/ 97</span>
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-black transition-colors p-1 ml-2 flex-shrink-0"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 flex-shrink-0">
              <button
                onClick={() => setActiveTab('qr')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeTab === 'qr'
                    ? 'text-gold border-b-2 border-gold bg-gold/5'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Yape / Plin
              </button>
              <button
                onClick={() => setActiveTab('bank')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeTab === 'bank'
                    ? 'text-gold border-b-2 border-gold bg-gold/5'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Bancos
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
              {activeTab === 'qr' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-gray-500 text-center">
                    Escanea el QR con tu app de pagos — Titular:{' '}
                    <span className="font-bold text-black">Nilton Cesar Giron</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Yape QR */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-gold/30 shadow-sm">
                        <img
                          src="/qr_yape.jpg"
                          alt="QR Yape - Nilton Cesar Giron Reyes"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-black uppercase tracking-wide">Yape</span>
                    </div>
                    {/* Plin QR */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-gold/30 shadow-sm">
                        <img
                          src="/qr_plin.jpg"
                          alt="QR Plin - Nilton Cesar Giron"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-black uppercase tracking-wide">Plin</span>
                    </div>
                  </div>
                  {/* Phone number */}
                  <div className="bg-gold/5 border border-gold/20 rounded-lg px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Celular</p>
                      <p className="text-sm font-bold text-black font-mono">960 873 225</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('960873225', 'phone')}
                      className="text-gold hover:text-gold-dark p-1.5 flex items-center gap-1 text-[10px] font-bold uppercase transition-colors"
                    >
                      {copiedField === 'phone' ? (
                        <span className="text-green-600">OK</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'bank' && (
                <div className="space-y-2">
                  <p className="text-[11px] text-gray-500 text-center mb-1">
                    Transferencia a nombre de{' '}
                    <span className="font-bold text-black">Nilton Cesar Giron Reyes</span>
                  </p>

                  {/* BBVA */}
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#004C92] rounded flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0">B</div>
                      <span className="text-xs font-bold text-black">BBVA Soles</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-gray-700">0011-0814-0237624772</span>
                      <button
                        onClick={() => copyToClipboard('0011-0814-0237624772', 'bbva')}
                        className="text-gold hover:text-gold-dark flex-shrink-0 p-1 transition-colors"
                        aria-label="Copiar cuenta BBVA"
                      >
                        {copiedField === 'bbva' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CCI */}
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#004C92] rounded flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0">CCI</div>
                      <span className="text-xs font-bold text-black">CCI (Otros bancos)</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-gray-700">01181400023762477218</span>
                      <button
                        onClick={() => copyToClipboard('01181400023762477218', 'cci')}
                        className="text-gold hover:text-gold-dark flex-shrink-0 p-1 transition-colors"
                        aria-label="Copiar CCI"
                      >
                        {copiedField === 'cci' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded">BCP</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">INTERBANK</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">y más</span>
                    </div>
                  </div>

                  {/* Swift */}
                  <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Swift</span>
                      <p className="text-xs font-mono font-bold text-black">BCONPEPL</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('BCONPEPL', 'swift')}
                      className="text-gold hover:text-gold-dark p-1 transition-colors"
                      aria-label="Copiar Swift"
                    >
                      {copiedField === 'swift' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Anchored WhatsApp CTA */}
            <div className="px-4 pb-4 pt-3 border-t border-gray-100 flex-shrink-0 bg-white">
              <a
                href={`https://wa.me/960873225?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window.fbq === 'function') {
                    window.fbq('track', 'Purchase', { currency: 'PEN', value: 97.00 });
                  }
                }}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] active:bg-[#128C7E] text-white py-3.5 rounded-[4px] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Ya pagué, enviar comprobante
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[340px] overflow-hidden rounded-[8px] border border-gray-100 bg-[#f9f9f9] select-none shadow-sm"
      style={{ cursor: 'col-resize' }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image — empty apartment */}
      <div className="absolute inset-0">
        <img
          src="/amoblamiento_antes.jpg"
          alt="Antes: departamento vacío"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider">
          Antes
        </div>
      </div>

      {/* After Image — furnished */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src="/amoblamiento_despues.jpg"
          alt="Después: amoblado con IA"
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
          Después (IA)
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gold shadow-[0_0_12px_rgba(207,174,99,0.6)] z-10 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-gold">
          <div className="flex items-center gap-1">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M2 1L0 7L2 13" stroke="#CFAE63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 1L8 7L6 13" stroke="#CFAE63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};


const Navbar = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E5E1D8] h-14 md:h-16">
    <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-ink rounded-sm flex items-center justify-center">
          <span className="text-gold font-black text-[11px] tracking-tighter">IA</span>
        </div>
        <span className="font-black text-sm md:text-base tracking-tight text-ink uppercase">
          Video IA Interior
        </span>
      </div>
      <button
        onClick={onCtaClick}
        className="bg-ink hover:bg-gray-800 text-white px-4 md:px-5 py-2 rounded-sm font-bold text-[11px] md:text-xs transition-all uppercase tracking-wide active:scale-95"
      >
        Inscribirme — S/ 97
      </button>
    </div>
  </nav>
);

export default function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Persistence: Check if the modal was open previously
  useEffect(() => {
    const wasOpen = localStorage.getItem('payment_modal_open') === 'true';
    if (wasOpen) setIsPaymentModalOpen(true);
  }, []);

  const handleOpenModal = () => {
    setIsPaymentModalOpen(true);
    localStorage.setItem('payment_modal_open', 'true');
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout');
    }
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    localStorage.setItem('payment_modal_open', 'false');
  };

  const steps = [
    { num: '01', title: 'Toma la foto del espacio', desc: 'Saca una foto con tu celular al departamento vacío. No necesitas cámara profesional ni iluminación especial.', icon: <Camera className="w-5 h-5" /> },
    { num: '02', title: 'Aplica el prompt maestro', desc: 'Copia y pega uno de los 50 prompts incluidos. Elige el estilo: nórdico, industrial, minimalista o premium.', icon: <Bot className="w-5 h-5" /> },
    { num: '03', title: 'Obtén el render en segundos', desc: 'La IA genera una imagen hiperrealista del espacio amoblado. Descárgala y úsala de inmediato.', icon: <Zap className="w-5 h-5" /> },
    { num: '04', title: 'Cierra ventas más rápido', desc: 'Comparte el antes/después por WhatsApp. Tus prospectos visualizan el potencial y deciden más rápido.', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const curriculum = [
    { label: 'Módulo 1', title: 'Fundamentos de la IA visual', desc: 'Qué herramientas usar, cómo funcionan y por qué son el futuro del marketing inmobiliario.' },
    { label: 'Módulo 2', title: 'La foto perfecta para la IA', desc: 'Técnica de ángulo, luz y encuadre que multiplica la calidad del resultado generado.' },
    { label: 'Módulo 3', title: 'Prompts que venden', desc: 'El sistema de 3 capas para describir cualquier espacio y obtener resultados hiperrealistas.' },
    { label: 'Módulo 4', title: 'Estilos decorativos con IA', desc: 'Cómo cambiar de estilo nórdico a industrial a premium con una sola línea de texto.' },
    { label: 'Módulo 5', title: 'Videos con IA para redes', desc: 'Convierte tus imágenes en videos de recorrido virtual para Instagram y TikTok en minutos.' },
    { label: 'Módulo 6', title: 'Cierre visual por WhatsApp', desc: 'Estrategia probada para usar el antes/después y eliminar objeciones de precio al instante.' },
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-gold selection:text-white overflow-x-hidden">
      <Navbar onCtaClick={handleOpenModal} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleCloseModal} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-24 pb-0 px-6 md:px-10 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[11px] font-bold uppercase tracking-[3px] text-gold mb-4 md:mb-5">
            Curso Online — Pago único S/ 97
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-serif text-center text-[36px] md:text-[60px] lg:text-[72px] font-black leading-[1.05] tracking-tight text-ink text-balance mx-auto max-w-4xl mb-5 md:mb-6">
            Crea Videos de{' '}<span className="text-gold">Diseño de Interiores</span>{' '}con IA en 10 Minutos
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="text-center text-base md:text-lg text-gray-mid leading-relaxed max-w-xl mx-auto mb-7 md:mb-9">
            Transforma departamentos vacíos en propiedades amobladas y produce videos virales de recorrido virtual — sin experiencia, sin software caro, sin diseñador.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.24 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-14">
            <button onClick={handleOpenModal} className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-sm font-bold text-sm md:text-base transition-all shadow-lg shadow-gold/30 active:scale-[0.98] uppercase tracking-wide">
              Quiero el curso por S/ 97
            </button>
            <a href="#como-funciona" className="w-full sm:w-auto border border-[#E5E1D8] hover:border-ink text-ink px-8 py-4 rounded-sm font-bold text-sm md:text-base transition-all text-center uppercase tracking-wide flex items-center justify-center gap-2">
              Ver cómo funciona <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.7 }} className="rounded-t-xl overflow-hidden border border-b-0 border-[#E5E1D8] shadow-xl">
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10">
          {[
            { value: '10 min', label: 'por propiedad amoblada' },
            { value: 'S/ 97', label: 'pago único, acceso de por vida' },
            { value: '50+', label: 'prompts maestros incluidos' },
            { value: '6', label: 'módulos en video paso a paso' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center md:px-8">
              <p className="font-serif text-2xl md:text-3xl font-black text-gold mb-1">{value}</p>
              <p className="text-[11px] text-white/60 uppercase tracking-wide font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ───────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-6 md:px-10 bg-surface border-b border-[#E5E1D8]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-gold-dark mb-3">El problema</p>
          <h2 className="font-serif text-2xl md:text-4xl font-black text-ink leading-tight mb-4 text-balance">
            Mostrar un departamento vacío te está costando ventas.
          </h2>
          <p className="text-gray-mid text-base md:text-lg leading-relaxed mb-8">
            Un espacio vacío luce más pequeño, más frío y menos deseable. Contratar un diseñador 3D toma semanas y cuesta más de S/ 1,500. El resultado: propiedades estancadas y clientes que no se deciden.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { icon: <Clock className="w-4 h-4 text-gold" />, title: 'Semanas de espera', desc: 'Un render profesional tarda 2-4 semanas en estar listo.' },
              { icon: <TrendingUp className="w-4 h-4 text-gold" />, title: 'Costos prohibitivos', desc: 'S/ 1,500+ por propiedad hace inviable amoblar todo tu portafolio.' },
              { icon: <Layout className="w-4 h-4 text-gold" />, title: 'Anuncios que no convierten', desc: 'Fotos vacías generan menos interés y menos consultas.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-[#E5E1D8] rounded-xl p-5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3">{icon}</div>
                <h4 className="font-bold text-ink text-sm mb-1">{title}</h4>
                <p className="text-gray-mid text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="como-funciona" className="py-14 md:py-20 px-6 md:px-10 bg-white border-b border-[#E5E1D8]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-gold text-center mb-3">El método</p>
          <h2 className="font-serif text-2xl md:text-4xl font-black text-ink text-center mb-10 md:mb-14 text-balance">
            De foto vacía a video amoblado en 4 pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {steps.map(({ num, title, desc, icon }) => (
              <div key={num} className="flex gap-5 items-start bg-surface border border-[#E5E1D8] rounded-xl p-5 md:p-6">
                <div className="w-11 h-11 rounded-xl bg-ink flex-shrink-0 flex items-center justify-center text-gold">{icon}</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[2px] text-gold-dark mb-1">{num}</p>
                  <h3 className="font-bold text-ink text-base mb-1.5">{title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-6 md:px-10 bg-surface border-b border-[#E5E1D8]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-gold mb-3">Contenido del curso</p>
            <h2 className="font-serif text-2xl md:text-4xl font-black text-ink leading-tight mb-4 text-balance">
              6 módulos en video, paso a paso
            </h2>
            <p className="text-gray-mid text-sm md:text-base leading-relaxed mb-6">
              Cada módulo está diseñado para aplicarlo de inmediato. Terminas el curso con imágenes y videos listos para publicar.
            </p>
            <button onClick={handleOpenModal} className="bg-gold hover:bg-gold-dark text-white px-6 py-3.5 rounded-sm font-bold text-sm transition-all shadow-md shadow-gold/20 active:scale-[0.98] uppercase tracking-wide flex items-center gap-2">
              Acceder al curso <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {curriculum.map(({ label, title, desc }, i) => (
              <div key={i} className="bg-white border border-[#E5E1D8] rounded-xl p-4 flex gap-4 items-start hover:border-gold/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-ink flex-shrink-0 flex items-center justify-center">
                  <Video className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-gold-dark uppercase tracking-[1.5px] mb-0.5">{label}</p>
                  <h4 className="font-bold text-ink text-sm mb-0.5">{title}</h4>
                  <p className="text-gray-mid text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONOS ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-6 md:px-10 bg-white border-b border-[#E5E1D8]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-gold text-center mb-3">Solo por hoy</p>
          <h2 className="font-serif text-2xl md:text-4xl font-black text-ink text-center mb-2 text-balance">
            4 Bonos Exclusivos Incluidos
          </h2>
          <p className="text-gray-mid text-sm md:text-base text-center mb-10">Valorados en S/ 344 — tuyos sin costo adicional.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              { icon: <BookOpen className="w-5 h-5 text-gold" />, title: 'Kit de 50 Prompts Maestros', price: 'S/ 97', desc: 'Comandos listos para copiar y pegar. Genera estilos Minimalistas, Industriales, Nórdicos y Premium en segundos.' },
              { icon: <Bot className="w-5 h-5 text-gold" />, title: "Agente IA 'Interiorista Pro'", price: 'S/ 120', desc: 'Instrucciones secretas para convertir a ChatGPT en tu propio diseñador de interiores que redacta prompts por ti.' },
              { icon: <Camera className="w-5 h-5 text-gold" />, title: "Checklist 'La Foto Perfecta'", price: 'S/ 47', desc: 'El ángulo y la luz exacta que necesita la IA para que tus renders parezcan fotos reales de profesional.' },
              { icon: <Video className="w-5 h-5 text-gold" />, title: 'Masterclass de Cierre Visual', price: 'S/ 80', desc: 'Cómo usar el antes/después en WhatsApp para eliminar objeciones y cerrar la venta al instante.' },
            ].map(({ icon, title, price, desc }) => (
              <div key={title} className="bg-surface border border-[#E5E1D8] rounded-xl p-5 flex gap-4 items-start hover:border-gold/40 transition-colors">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white border border-[#E5E1D8] flex items-center justify-center shadow-sm">{icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm font-extrabold text-ink">{title}</h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[11px] text-gray-light line-through">{price}</span>
                      <span className="text-[10px] font-black text-white bg-green-600 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">GRATIS</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-mid leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE STACK + FINAL CTA ───────────────────────────── */}
      <section className="py-14 md:py-20 px-6 md:px-10 bg-ink">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-gold mb-4">Todo incluido</p>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-white mb-2 text-balance leading-tight">
            Curso + 4 Bonos por un único pago
          </h2>
          <p className="text-white/50 text-sm mb-8 line-through">Valor total: S/ 597</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 text-left space-y-3">
            {[
              { label: 'Curso principal en video (6 módulos)', badge: 'Incluido' },
              { label: 'Kit de 50 Prompts Maestros', badge: '+ Bono' },
              { label: "Agente IA 'Interiorista Pro'", badge: '+ Bono' },
              { label: "Checklist 'La Foto Perfecta'", badge: '+ Bono' },
              { label: 'Masterclass de Cierre Visual', badge: '+ Bono' },
            ].map(({ label, badge }) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-white/80 text-sm">{label}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wide text-gold border border-gold/30 px-2 py-0.5 rounded-sm flex-shrink-0">{badge}</span>
              </div>
            ))}
          </div>
          <p className="font-serif text-6xl md:text-7xl font-black text-gold leading-none mb-1">S/ 97</p>
          <p className="text-white/50 text-xs uppercase tracking-[2px] mb-8">Pago único — Acceso de por vida</p>
          <button onClick={handleOpenModal} className="w-full bg-gold hover:bg-gold-dark text-white py-4 md:py-5 rounded-sm font-black text-base md:text-lg transition-all shadow-xl shadow-gold/20 active:scale-[0.98] uppercase tracking-wide mb-3">
            Quiero todo esto por S/ 97
          </button>
          <p className="text-white/30 text-[11px]">Acceso inmediato tras confirmar tu pago por WhatsApp.</p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-black py-5 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white/10 rounded-sm flex items-center justify-center">
              <span className="text-gold font-black text-[10px]">IA</span>
            </div>
            <p className="text-white/40 text-[12px]">&copy; {new Date().getFullYear()} Video IA Interior. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-5 text-white/40 text-[12px] font-medium">
            <a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-gold transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


