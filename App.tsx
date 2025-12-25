import React, { useState, useEffect } from 'react';
import { 
  Zap, Menu, X, Shield, Download, Headphones, 
  Book, BookOpen, Smartphone, 
  Twitter, Linkedin, Instagram, Github, Globe, CreditCard, 
  Mail, ChevronDown, ShoppingBag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, Bundle } from './types';
import { Button } from './components/ui/Button';
import { LeadModal } from './components/LeadModal';
import { analytics } from './services/analytics';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  
  const [modalBookId, setModalBookId] = useState<string | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'pdf' | 'audio'>('pdf');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Direct Checkout Logic (Gumroad)
  const handleBuyNow = (item: Product | Bundle) => {
    analytics.track({ event: 'begin_checkout', data: { id: item.id, name: item.title, price: 'price' in item ? item.price : 'bundle' } });
    
    // In a real scenario, use item.gumroadUrl. Here we simulate the link.
    const checkoutUrl = item.gumroadUrl || `https://gumroad.com/l/placeholder?wanted=true`;
    window.open(checkoutUrl, '_blank');
  };

  const openLeadModal = (bookId?: string, mode: 'pdf' | 'audio' = 'pdf') => {
    setModalBookId(bookId);
    setModalMode(mode);
    setIsLeadModalOpen(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    { q: "¿En qué formato recibo los libros?", a: "Todos nuestros libros se entregan instantáneamente en formato PDF (alta calidad) y EPUB (para lectores como Kindle o Apple Books)." },
    { q: "¿Tienen garantía de devolución?", a: "Sí. Si el contenido no cumple con tus expectativas profesionales, tienes 7 días para solicitar un reembolso completo sin preguntas." },
    { q: "¿Cómo accedo al Podcast Premium?", a: "Al comprar cualquier libro o dejar tus datos, recibirás un enlace exclusivo para nuestra comunidad privada en Spotify." },
    { q: "¿Puedo compartir los archivos con mi equipo?", a: "Las licencias son individuales. Para compras corporativas (+5 licencias), contáctanos para un descuento especial." }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-3 border-b border-white/5' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform">Z</div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Zone-Digital</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="text-slate-300 hover:text-white font-bold text-lg transition-all transform hover:scale-110 cursor-pointer">Libros</a>
              <button onClick={() => openLeadModal(undefined, 'audio')} className="text-slate-300 hover:text-white font-bold text-lg transition-all transform hover:scale-110 bg-transparent border-none cursor-pointer">Podcast</button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-950 flex items-center min-h-[85vh]">
          {/* Background FX */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
             <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-900/10 blur-[100px] rounded-full mix-blend-screen"></div>
             <img src="https://grainy-gradients.vercel.app/noise.svg" className="opacity-10 w-full h-full object-cover" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> EdTech Revolution
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
                  Acelera tu carrera con <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-400 to-white">Conocimiento Real</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                   Libros tácticos, directos y sin relleno para dominar Cloud, Negocios e IA. <strong className="text-white">Aprende hoy. Implementa mañana.</strong>
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white border-0 shadow-xl shadow-brand-600/20 px-8 h-14 rounded-xl font-bold transition-transform hover:scale-105" onClick={(e) => handleNavClick(e as any, 'products')}>
                    <Book className="mr-2 w-5 h-5" /> Ver Catálogo
                  </Button>
                  
                  {/* BUTTON FIXED: STATIC CYAN COLOR (CELESTE) */}
                  <Button size="lg" className="w-full sm:w-auto bg-cyan-500 text-white hover:bg-cyan-400 border-none shadow-xl shadow-cyan-500/20 px-8 h-14 rounded-xl font-bold transition-transform hover:scale-105" onClick={() => openLeadModal(undefined, 'pdf')}>
                    <BookOpen className="mr-2 w-5 h-5" /> Capítulo Gratis
                  </Button>

                  <Button size="lg" className="w-full sm:w-auto text-white border-2 border-white bg-transparent hover:bg-white hover:text-slate-900 px-6 h-14 rounded-xl font-bold backdrop-blur-sm transition-all" onClick={() => openLeadModal(undefined, 'audio')}>
                    <Headphones className="mr-2 w-5 h-5" /> Podcast
                  </Button>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                        </div>
                      ))}
                   </div>
                   <p>Únete a <span className="text-white font-bold">+5,000 profesionales</span></p>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 hidden lg:flex justify-end perspective-[1500px] z-20">
                 <div className="relative w-[360px] h-[480px] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center transform hover:rotate-y-6 transition-all duration-700 group animate-float">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-500/20 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-[80px]"></div>

                    <div className="w-32 h-32 bg-gradient-to-tr from-brand-500 to-cyan-400 rounded-3xl shadow-lg flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform">
                       <span className="text-6xl font-black text-white italic">Z</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Zone-Digital</h3>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-brand-400 to-cyan-400 rounded-full mb-6"></div>
                    
                    <div className="text-center mt-2 mb-4 space-y-1">
                       <p className="text-lg font-bold text-white tracking-wide">Plataforma Educativa</p>
                       <p className="text-sm font-medium text-cyan-300 uppercase tracking-widest">Premium Edition</p>
                    </div>

                    <div className="mt-8 px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-xs text-cyan-300 font-mono tracking-widest uppercase">
                       Future Ready
                    </div>
                 </div>
              </div>

            </div>
          </div>
      </section>

      {/* Main Catalog */}
      <section id="products" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight italic uppercase">La Biblioteca del Experto</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">Impulsa tu crecimiento con material táctico verificado por expertos internacionales.</p>
          </div>

          {/* Filtering */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 sticky top-20 z-30">
            <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl flex overflow-x-auto gap-1 max-w-full scrollbar-hide border border-slate-800">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wide ${
                    selectedCategory === cat ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-80 relative group">
              <input 
                type="text" 
                placeholder="Buscar libro..." 
                className="w-full pl-5 pr-12 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder-slate-400 shadow-sm group-hover:shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-5 top-4 text-slate-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col group h-full hover:-translate-y-2 relative">
                <div className="relative h-64 bg-slate-100 overflow-hidden group-hover:shadow-inner transition-all">
                  <img 
                    src={product.coverImage} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.95] group-hover:brightness-100" 
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/800x600/0c4a6e/ffffff?text=${encodeURIComponent(product.title)}`;
                    }}
                  />
                  <div className="absolute top-4 right-4 z-20 bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-md shadow-lg border border-amber-300">BESTSELLER</div>
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-20 bg-white">
                  <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-2 bg-brand-50 w-fit px-2 py-1 rounded">{product.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight min-h-[3.5rem]">{product.title}</h3>
                  
                  <div className="mb-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-400 to-cyan-400 rounded-full"></div>
                    <p className="text-slate-600 text-sm pl-4 italic leading-relaxed font-medium">"{product.tagline}"</p>
                  </div>

                  <div className="space-y-3 mb-8 flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Zap size={12} className="text-amber-500" /> Lo que aprenderás:
                    </p>
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                         <div className="mt-1 min-w-[6px] h-6px w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></div>
                         <span className="text-xs text-slate-700 font-semibold leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                         <span className="text-xs text-slate-400 line-through font-medium">US$ 14.99</span>
                         <span className="text-3xl font-black text-slate-900 tracking-tight text-brand-600">US$ {product.price}</span>
                      </div>
                      <Button onClick={() => handleBuyNow(product)} className="rounded-xl px-5 py-3 h-auto font-bold shadow-brand-500/20 hover:scale-105 hover:shadow-lg transition-all">
                        <ShoppingBag size={16} className="mr-2" /> Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Shield className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Pago 100% Seguro</h3>
              <p className="text-slate-500 text-sm max-w-xs">Procesamos pagos con encriptación SSL de 256-bits. Tus datos nunca se almacenan.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Download className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Acceso Instantáneo</h3>
              <p className="text-slate-500 text-sm max-w-xs">Sin esperas. Recibe tus enlaces de descarga en tu correo segundos después de la compra.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Smartphone className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Multiformato</h3>
              <p className="text-slate-500 text-sm max-w-xs">PDF para PC/Mac y EPUB optimizado para leer en tu móvil, tablet o Kindle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORLD CLASS FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Footer: Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 border-b border-slate-900 pb-16">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl">Z</div>
                <span className="text-2xl font-bold text-white tracking-tight">Zone-Digital</span>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                Empoderando a la próxima generación de líderes digitales con contenido táctico, directo y validado por la industria.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"><Linkedin size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"><Github size={18} /></a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900/50 rounded-2xl p-8 border border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Mail size={20} className="text-brand-500"/> Únete al Newsletter</h4>
                <p className="text-sm">Recibe consejos de carrera y descuentos exclusivos semanales.</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <Button onClick={() => openLeadModal()} className="whitespace-nowrap bg-white text-slate-950 font-bold hover:bg-cyan-400 border-none px-6">
                  Suscribirse Gratis
                </Button>
              </div>
            </div>
          </div>

          {/* Middle Footer: Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Tienda</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#products" className="hover:text-cyan-400 transition-colors">Todos los Libros</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Lo más vendido</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">Podcast <span className="bg-brand-900 text-brand-300 text-[10px] px-1.5 py-0.5 rounded font-bold">NEW</span></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Categorías</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cloud Computing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Inteligencia Artificial</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Gestión de Proyectos</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Minería 4.0</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Soporte</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Reembolso</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Licencias de Equipo</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 gap-4">
            <p className="text-xs text-slate-500">
              © 2024 Zone-Digital Inc. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                 <CreditCard size={20} />
                 <span className="text-xs font-bold">Stripe</span>
              </div>
              <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                 <Globe size={20} />
                 <span className="text-xs font-bold">SSL Secure</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} initialBookId={modalBookId} initialMode={modalMode} />
    </div>
  );
};

export default App;