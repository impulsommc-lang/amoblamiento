import React, { useState, useRef, useEffect } from 'react';
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
  MessageCircle
} from 'lucide-react';

// --- Components ---

const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[12px] shadow-2xl relative z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 text-center bg-gray-50 border-b border-gray-100 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-xl md:text-2xl font-extrabold text-black mb-2">
                Estás a un paso de transformar tus inmuebles
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Realiza el pago único de <span className="font-bold text-black text-lg">S/ 47</span> a través de cualquiera de estos métodos y envía tu comprobante para recibir acceso inmediato.
              </p>
            </div>

            {/* Methods Grid */}
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto">
              {/* Yape/Plin */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-black uppercase tracking-wider mb-2">
                  <Smartphone className="w-5 h-5 text-gold" />
                  Yape o Plin
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-[32px] mb-1">📱</span>
                    <span className="text-[10px] font-bold text-gray-400">QR YAPE</span>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-[32px] mb-1">💠</span>
                    <span className="text-[10px] font-bold text-gray-400">QR PLIN</span>
                  </div>
                </div>
                <div className="bg-gold/5 p-4 rounded-lg border border-gold/20">
                  <p className="text-xs text-gray-500 mb-1">Número de celular:</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-black">960873225</span>
                    <button 
                      onClick={() => copyToClipboard('960873225', 'phone')}
                      className="text-gold hover:text-gold-dark p-1 flex items-center gap-1 text-[10px] font-bold uppercase transition-colors"
                    >
                      {copiedField === 'phone' ? '¡Copiado!' : <><Copy className="w-3 h-3" /> Copiar</>}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">Titular: Nilton Giron</p>
                </div>
              </div>

              {/* Transferencia */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-black uppercase tracking-wider mb-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Transferencia Bancaria
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#004C92] rounded flex items-center justify-center text-[10px] text-white font-bold">B</div>
                      <span className="text-xs font-bold text-black">Cuenta BBVA Soles</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium">0011-0814-0237624772</span>
                      <button 
                        onClick={() => copyToClipboard('0011-0814-0237624772', 'bbva')}
                        className="text-gold hover:text-gold-dark p-1 flex items-center gap-1 text-[10px] font-bold uppercase"
                      >
                        {copiedField === 'bbva' ? 'OK' : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#004C92] rounded flex items-center justify-center text-[10px] text-white font-bold">CCI</div>
                      <span className="text-xs font-bold text-black">CCI (Otros bancos)</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium">01181400023762477218</span>
                      <button 
                        onClick={() => copyToClipboard('01181400023762477218', 'cci')}
                        className="text-gold hover:text-gold-dark p-1 flex items-center gap-1 text-[10px] font-bold uppercase"
                      >
                        {copiedField === 'cci' ? 'OK' : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 opacity-60">
                      <div className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded">BCP</div>
                      <div className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">INTERBANK</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Swift: <span className="text-black font-mono">BCONPEPL</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
              <a 
                href={`https://wa.me/960873225?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-[4px] font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                Ya pagué, enviar comprobante por WhatsApp
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[260px] overflow-hidden rounded-[8px] border border-gray-100 bg-[#f9f9f9] cursor-col-resize group shadow-sm"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image (Empty) */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
          alt="Antes"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider">
          Antes (Vacío)
        </div>
      </div>

      {/* After Image (Furnished) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
          alt="Después"
          className="w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.offsetWidth }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
          Después (IA)
        </div>
      </div>

      {/* Divider */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-gold shadow-[0_0_10px_rgba(207,174,99,0.5)] z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gold group-active:scale-110 transition-transform">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-2 bg-gold" />
            <div className="w-0.5 h-2 bg-gold" />
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
