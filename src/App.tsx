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
  User, 
  Settings, 
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

  const whatsappMessage = encodeURIComponent("Hola, acabo de realizar el pago de S/ 47 para el curso de Amoblamiento con IA. Aquí te adjunto mi comprobante para el acceso.");

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
                <span className="text-gold">S/ 47</span>
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
                    window.fbq('track', 'Purchase', { currency: 'PEN', value: 47.00 });
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
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-14 md:h-16">
    <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded flex items-center justify-center">
          <span className="text-gold font-bold text-[10px] md:text-sm">IA</span>
        </div>
        <span className="font-bold text-sm md:text-lg tracking-tighter">AMUEBLA</span>
      </div>
      <button 
        onClick={onCtaClick}
        className="bg-gold hover:bg-gold-dark text-white px-3 md:px-4 py-1.5 md:py-2 rounded-[4px] font-bold text-[10px] md:text-xs transition-all shadow-md shadow-gold/20 active:scale-95"
      >
        ¡COMPRAR!
      </button>
    </div>
  </nav>
);
const SectionHeading = ({ children, light = false, className = "" }: { children: React.ReactNode, light?: boolean, className?: string }) => (
  <h2 className={`text-2xl md:text-[32px] font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-black'} ${className}`}>
    {children}
  </h2>
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

  return (
    <div className="min-h-screen bg-white selection:bg-gold selection:text-white overflow-x-hidden">
      <Navbar onCtaClick={handleOpenModal} />
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={handleCloseModal} 
      />

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-28 pb-6 md:pb-10 px-6 md:px-10 max-w-6xl mx-auto min-h-[90vh] md:min-h-0 flex flex-col justify-center">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-10 items-center">
          <div className="text-center md:text-left">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#333333] font-semibold mb-2 md:mb-3 uppercase tracking-[1px] text-[11px] md:text-[13px]"
            >
              🚀 Exclusivo para agentes inmobiliarios
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-[42px] font-extrabold leading-[1.1] mb-3 md:mb-4 tracking-[-1px]"
            >
              Transforma Inmuebles Vacíos en Propiedades de Lujo con IA
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-[#333333] mb-5 md:mb-6 leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              Aprende a crear amoblamientos virtuales hiperrealistas en 10 minutos sin conocimientos previos de diseño.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={handleOpenModal}
                className="w-full md:w-auto inline-block bg-gold hover:bg-gold-dark text-white px-8 md:px-9 py-4 rounded-[4px] font-bold text-sm md:text-base transition-all shadow-lg shadow-gold/30 active:scale-95"
              >
                ¡Quiero aprender ahora por S/ 47!
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full"
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-black py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading light className="text-xl md:text-2xl mb-1 md:mb-2">
            Mostrar un departamento vacío te está haciendo perder dinero.
          </SectionHeading>
          <p className="text-sm md:text-[15px] text-white/80 leading-relaxed">
            Un espacio vacío se ve más pequeño y frío. Contratar un diseñador 3D toma semanas y cuesta más de S/ 1,500. El resultado: propiedades estancadas.
          </p>
        </div>
      </section>

      {/* FEATURES & PRICING CONTAINER */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 py-8 md:py-12 px-6 md:px-10 items-stretch">
        {/* FEATURES */}
        <section>
          <h3 className="text-base md:text-lg font-bold mb-5 md:mb-6 text-black">El Método Definitivo con IA</h3>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-start gap-3 md:gap-4 group">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 border border-gray-100 rounded-[8px] flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold/5 transition-colors">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-black mb-0.5 md:mb-1">Velocidad extrema</h4>
                <p className="text-xs md:text-sm text-[#333333] leading-relaxed">
                  Amobla cualquier propiedad en menos de 10 minutos con resultados profesionales.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 group">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 border border-gray-100 rounded-[8px] flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold/5 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-black mb-0.5 md:mb-1">Cero experiencia</h4>
                <p className="text-xs md:text-sm text-[#333333] leading-relaxed">
                  No necesitas saber diseñar. Solo copia y pega los prompts que te entregamos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 group">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 border border-gray-100 rounded-[8px] flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold/5 transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-black mb-0.5 md:mb-1">Control total</h4>
                <p className="text-xs md:text-sm text-[#333333] leading-relaxed">
                  Cambia el estilo de decoración de nórdico a industrial en solo segundos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <article id="oferta" className="h-full">
          <div className="h-full bg-white rounded-xl p-6 md:p-8 border-2 border-gold flex flex-col justify-center text-center shadow-sm">
            <p className="text-base md:text-[18px] font-bold text-gold mb-3 md:mb-4">Oferta de Lanzamiento</p>
            <p className="text-[#999999] text-sm md:text-base line-through mb-0.5">Precio regular: S/ 1,500</p>
            <p className="text-4xl md:text-5xl font-black text-black mb-1 md:mb-2 tracking-tighter">S/ 47</p>
            <p className="text-[12px] md:text-[14px] text-[#333333] mb-5 md:mb-6 font-medium tracking-tight">Único pago. Acceso inmediato de por vida.</p>
            <button 
              onClick={handleOpenModal}
              className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 md:py-4 rounded-[4px] font-bold text-sm md:text-base transition-all shadow-md shadow-gold/20 active:scale-[0.98]"
            >
              Sí, quiero el curso por S/ 47
            </button>
          </div>
        </article>
      </div>

      {/* BONOS SECTION */}
      <section className="py-10 md:py-14 px-6 md:px-10 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-gold text-center mb-1">
            Solo por hoy
          </p>
          <h2 className="text-2xl md:text-[32px] font-extrabold text-black text-center tracking-tight mb-1 text-balance">
            4 Bonos Exclusivos Incluidos
          </h2>
          <p className="text-sm text-[#555555] text-center mb-8 md:mb-10">
            Valorados en S/ 344 — tuyos sin costo adicional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Bono 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 items-start">
              <div className="w-10 h-10 flex-shrink-0 rounded-[8px] bg-gold/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-extrabold text-black">Kit de 50 Prompts Maestros</h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 line-through">S/ 97</span>
                    <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">GRATIS</span>
                  </div>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Comandos listos para copiar y pegar. Genera estilos Minimalistas, Industriales, Nórdicos y Premium en segundos.
                </p>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 items-start">
              <div className="w-10 h-10 flex-shrink-0 rounded-[8px] bg-gold/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-extrabold text-black">Agente IA &apos;Interiorista Pro&apos;</h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 line-through">S/ 120</span>
                    <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">GRATIS</span>
                  </div>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Instrucciones secretas para convertir a ChatGPT en tu propio diseñador de interiores personal que redacta tus prompts por ti.
                </p>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 items-start">
              <div className="w-10 h-10 flex-shrink-0 rounded-[8px] bg-gold/10 flex items-center justify-center">
                <Camera className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-extrabold text-black">Checklist &apos;La Foto Perfecta&apos;</h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 line-through">S/ 47</span>
                    <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">GRATIS</span>
                  </div>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Aprende el ángulo y la luz exacta que necesita la IA para que tus renders parezcan fotos reales tomadas por un profesional.
                </p>
              </div>
            </div>

            {/* Bono 4 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 items-start">
              <div className="w-10 h-10 flex-shrink-0 rounded-[8px] bg-gold/10 flex items-center justify-center">
                <Video className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-extrabold text-black">Masterclass de Cierre Visual</h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 line-through">S/ 80</span>
                    <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">GRATIS</span>
                  </div>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Cómo usar estas imágenes estratégicamente en WhatsApp para eliminar las dudas de tus prospectos y cerrar la venta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STACK + FINAL CTA */}
      <section className="py-10 md:py-14 px-6 md:px-10 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto">
          {/* Value stack box */}
          <div className="bg-black rounded-xl p-6 md:p-8 text-center mb-5 shadow-xl">
            <p className="text-gold text-xs font-bold uppercase tracking-[2px] mb-3">
              Curso Amoblamiento con IA + 4 Bonos Exclusivos
            </p>
            <div className="flex flex-col items-center gap-1 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm line-through">Valor Total: S/ 597</span>
              </div>
              <p className="text-gold text-4xl md:text-5xl font-black tracking-tighter leading-none">
                S/ 47
              </p>
              <p className="text-white/60 text-xs font-medium mt-1 uppercase tracking-wide">
                Precio de oferta hoy — pago único
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1.5 text-left mb-5">
              {[
                'Curso principal: Amoblamiento con IA',
                'Kit de 50 Prompts Maestros',
                "Agente IA 'Interiorista Pro'",
                "Checklist 'La Foto Perfecta'",
                'Masterclass de Cierre Visual',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-white/80 text-xs">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleOpenModal}
              className="w-full bg-gold hover:bg-gold-dark active:scale-[0.98] text-white py-4 rounded-[4px] font-extrabold text-base transition-all shadow-lg shadow-gold/30"
            >
              Quiero todo esto por S/ 47
            </button>
          </div>

          <p className="text-center text-[11px] text-gray-400">
            Acceso inmediato tras confirmar tu pago por WhatsApp.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-4 px-10 text-center border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#999999] text-[12px]">
            &copy; {new Date().getFullYear()} Virtual IA Real Estate. Todos los derechos reservados.
          </p>
          
          <div className="flex gap-6 text-[#999999] text-[12px] font-medium">
            <a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-gold transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
