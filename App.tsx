import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check, Zap, ChevronDown, Menu, X, Shield, Download, Mail, Headphones, PlayCircle, Book, ArrowRight, BookOpen } from 'lucide-react';
import { PRODUCTS, BUNDLES, CATEGORIES, TESTIMONIALS } from './constants';
import { Product, CartItem, Bundle } from './types';
import { Button } from './components/ui/Button';
import { LeadModal } from './components/LeadModal';
import { CartDrawer } from './components/CartDrawer';
import { analytics } from './services/analytics';
import { triggerAbandonedCart } from './services/api';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  
  // Modal State
  const [modalBookId, setModalBookId] = useState<string | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'pdf' | 'audio'>('pdf');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const savedCart = localStorage.getItem('zone_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    analytics.track({ event: 'view_item', data: { page: 'home' } });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('zone_cart', JSON.stringify(cart));
    const handleUnload = () => {
      if (cart.length > 0) triggerAbandonedCart(cart);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [cart]);

  const addToCart = (item: Product | Bundle, type: 'product' | 'bundle') => {
    const price = 'discount' in item 
      ? item.productIds.reduce((acc, id) => {
          const p = PRODUCTS.find(prod => prod.id === id);
          return acc + (p ? p.price : 0);
        }, 0) * (1 - item.discount)
      : item.price;

    const newItem: CartItem = {
      productId: item.id,
      type,
      title: item.title,
      price,
      image: item.coverImage
    };

    setCart([...cart, newItem]);
    setIsCartOpen(true);
    analytics.track({ event: 'add_to_cart', data: { id: item.id, name: item.title, value: price } });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const openLeadModal = (bookId?: string, mode: 'pdf' | 'audio' = 'pdf') => {
    setModalBookId(bookId);
    setModalMode(mode);
    setIsLeadModalOpen(true);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBundlePrice = (bundle: Bundle) => {
    const originalPrice = bundle.productIds.reduce((acc, id) => {
      const p = PRODUCTS.find(prod => prod.id === id);
      return acc + (p ? p.price : 0);
    }, 0);
    return {
      original: originalPrice,
      final: originalPrice * (1 - bundle.discount)
    };
  };

  // Robust scrolling handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-3 border-b border-white/5' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Area - Acts as Home */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-brand-500/30 shadow-lg border border-white/10 group-hover:scale-105 transition-transform bg-slate-800">
                 <img src="/logo.png" alt="Z" className="w-full h-full object-cover" onError={(e) => {e.currentTarget.src = 'https://ui-avatars.com/api/?name=Z&background=0284c7&color=fff&font-size=0.6&bold=true'}} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                Zone-Digital
              </span>
            </div>
            
            {/* Desktop Menu - DIRECT SCROLL LINKS - LARGER FONT SIZE */}
            <div className="hidden md:flex items-center space-x-12">
              <a 
                href="#products" 
                onClick={(e) => handleNavClick(e, 'products')}
                className="text-slate-300 hover:text-white font-bold text-lg lg:text-xl transition-all hover:scale-110 transform cursor-pointer tracking-wide"
              >
                Libros
              </a>
              <a 
                href="#audio-learning" 
                onClick={(e) => handleNavClick(e, 'audio-learning')}
                className="text-slate-300 hover:text-white font-bold text-lg lg:text-xl transition-all hover:scale-110 transform cursor-pointer tracking-wide"
              >
                Podcast
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <Button 
                size="md" 
                onClick={(e) => { e.preventDefault(); handleNavClick(e as any, 'contact'); }}
                className="hidden md:flex bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm cursor-pointer font-bold px-6"
              >
                Contacto
              </Button>
              <button 
                className="relative p-3 text-white hover:text-brand-400 transition-colors bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-sm"
                onClick={() => setIsCartOpen(true)}
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white transform bg-red-600 rounded-full shadow-sm border-2 border-slate-900">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-950 border-t border-slate-800 shadow-2xl md:hidden animate-in slide-in-from-top-2">
             <div className="flex flex-col p-6 space-y-4">
               <a 
                 href="#products" 
                 className="text-slate-300 font-bold text-2xl p-4 rounded-xl hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-between cursor-pointer" 
                 onClick={(e) => handleNavClick(e, 'products')}
               >
                  Libros <ArrowRight size={24} className="opacity-50" />
               </a>
               <a 
                 href="#audio-learning" 
                 className="text-slate-300 font-bold text-2xl p-4 rounded-xl hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-between cursor-pointer" 
                 onClick={(e) => handleNavClick(e, 'audio-learning')}
               >
                  Podcast <ArrowRight size={24} className="opacity-50" />
               </a>
               <a 
                 href="#contact" 
                 className="text-slate-300 font-bold text-2xl p-4 rounded-xl hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-between cursor-pointer" 
                 onClick={(e) => handleNavClick(e, 'contact')}
               >
                  Contacto <ArrowRight size={24} className="opacity-50" />
               </a>
             </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-slate-950 min-h-[600px] lg:min-h-[750px] flex items-center">
        
        {/* Tech Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Global Tech Network" 
            className="w-full h-full object-cover opacity-30 sm:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-slate-950"></div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in-up">
              
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                EdTech Revolution
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Acelera tu carrera con <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-white filter drop-shadow-[0_2px_10px_rgba(0,180,255,0.3)]">
                   Conocimiento Real
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 mb-8 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Libros tácticos, directos y sin relleno para dominar Cloud, Negocios e IA. 
                <strong className="text-white font-semibold block mt-1">Aprende hoy. Implementa mañana.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                {/* Primary: Shop */}
                <Button 
                   size="lg" 
                   className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-500/40 border-none px-8 text-lg h-14 rounded-xl font-bold" 
                   onClick={(e) => handleNavClick(e as any, 'products')}
                >
                  <Book className="mr-2 w-5 h-5" /> Ver Catálogo
                </Button>

                {/* Secondary: Free Chapter - FIXED VISIBILITY */}
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 shadow-2xl px-8 text-lg h-14 border-none rounded-xl font-black" 
                  onClick={() => openLeadModal(undefined, 'pdf')}
                >
                  <BookOpen className="mr-2 w-5 h-5 text-brand-600" /> Capítulo Gratis
                </Button>

                {/* Tertiary: Podcast - FIXED VISIBILITY */}
                <Button 
                  size="lg" 
                  variant="ghost"
                  className="w-full sm:w-auto text-white font-bold border-2 border-white/20 hover:bg-white/10 hover:border-white/40 px-6 h-14 rounded-xl backdrop-blur-md" 
                  onClick={() => openLeadModal(undefined, 'audio')}
                >
                  <Headphones className="mr-2 w-5 h-5" /> Escuchar Podcast
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col text-left">
                   <div className="flex text-yellow-400">
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                   </div>
                   <p className="text-xs font-medium">Usado por <span className="text-white font-bold">+5,000 profesionales</span></p>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Visual */}
            <div className="flex-1 flex justify-center lg:justify-end animate-float hidden md:flex">
               <div className="relative w-[300px] h-[400px] md:w-[380px] md:h-[480px]">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-[80px]"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-600/30 rounded-full blur-[80px]"></div>
                  
                  <div className="relative w-full h-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex items-center justify-center p-8 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                     
                     <div className="relative z-10 text-center">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-brand-500 to-cyan-400 rounded-3xl shadow-lg shadow-brand-500/40 flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-all duration-500 border border-white/20">
                           <span className="text-7xl font-black text-white italic">Z</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Zone-Digital</h3>
                        <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mb-4"></div>
                        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Future Ready</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rest of the app components remain unchanged for performance and reliability */}
      {/* ... Trust Badges, Products, Audio, Bundles, etc. */}
      
      {/* (Self-contained sections to ensure they keep working as before) */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Contenido alineado a estándares globales</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mix-blend-multiply items-center">
            {['AWS', 'Google Cloud', 'Microsoft Azure', 'PMI', 'CFA Institute', 'Minería 4.0'].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-black text-slate-800 tracking-tight whitespace-nowrap">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">La Biblioteca del Experto</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Selecciona tu área de interés. <span className="font-semibold text-brand-600">Compra segura</span>, descarga inmediata y formato compatible con todos los dispositivos.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 sticky top-24 z-30 shadow-sm backdrop-blur-md bg-opacity-90">
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide px-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'bg-white text-brand-600 shadow-md ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:bg-white hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-80 relative pr-2">
              <input 
                type="text" 
                placeholder="Buscar (ej. Minería, PMP)..." 
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-5 top-3 text-slate-400 pointer-events-none">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 p-8 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                  <img src={product.coverImage} alt={product.title} className="w-3/4 h-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-500 rotate-1 group-hover:rotate-0 rounded-md" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-100 uppercase tracking-wide">
                    {product.formats.join(' + ')}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold text-brand-600 mb-3 uppercase tracking-widest bg-brand-50 inline-block py-1 px-2 rounded w-fit">{product.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2">{product.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.tagline}</p>
                  <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-1">
                    {product.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-green-600" />
                        </div>
                        <span className="line-clamp-2 font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                         <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-medium line-through">US$ {Math.round(product.price * 1.3)}</span>
                          <span className="text-2xl font-bold text-slate-900">US$ {product.price}</span>
                        </div>
                    </div>
                    <Button onClick={() => addToCart(product, 'product')} className="w-full shadow-lg shadow-brand-100 py-3 text-base rounded-xl">
                      Añadir al Carrito
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200" onClick={() => openLeadModal(product.id, 'pdf')}>
                        <Download size={14} /> PDF Gratis
                      </button>
                      <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-100" onClick={() => openLeadModal(product.id, 'audio')}>
                        <Headphones size={14} /> Audio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audio-learning" className="py-24 bg-slate-900 text-white overflow-hidden relative scroll-mt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Nuevo Formato
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">¿Sin tiempo para leer? <br/> <span className="text-green-400">Escucha y Aprende.</span></h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl leading-relaxed mx-auto md:mx-0">
                Transformamos nuestros best-sellers en episodios de audio de alto impacto. Ideales para el gimnasio, el tráfico o mientras cocinas.
              </p>
              <Button onClick={() => openLeadModal(undefined, 'audio')} className="bg-green-600 hover:bg-green-500 text-white border-0 shadow-xl shadow-green-900/30 px-8 py-4 h-auto text-lg rounded-xl">
                Escuchar Gratis en Spotify
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 rounded-full"></div>
                  <img src="https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=800&q=80" alt="Podcast" className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 border border-slate-700/50" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bundles" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Packs de Especialización</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Acelera tu aprendizaje y ahorra hasta un 25% comprando la colección completa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BUNDLES.map(bundle => {
              const { original, final } = getBundlePrice(bundle);
              return (
                <div key={bundle.id} className="relative flex flex-col bg-slate-900 rounded-[2rem] overflow-hidden group shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500"></div>
                  <div className="p-8 flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{bundle.title}</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">{bundle.description}</p>
                    <div className="space-y-4 mb-8">
                      {bundle.productIds.map(pid => {
                        const p = PRODUCTS.find(prod => prod.id === pid);
                        return p ? (
                          <div key={pid} className="flex items-center gap-3 text-slate-300 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="truncate font-medium">{p.title}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="bg-white p-8">
                    <div className="flex justify-between items-end mb-4">
                      <div className="text-slate-400 line-through text-sm">US$ {original.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-black text-slate-900">US$ {final.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => addToCart(bundle, 'bundle')} className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl py-4 h-auto rounded-xl">
                      Comprar Pack
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white border-t border-slate-100 scroll-mt-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">¿Necesitas ayuda o consultoría corporativa?</h2>
            <Button size="lg" variant="outline" onClick={() => window.location.href='mailto:contacto@zone-digital.com'} className="px-8 h-14 text-base border-slate-300 text-slate-700 hover:border-brand-600 hover:text-brand-600 rounded-xl">
              <Mail className="mr-2" /> Contactar Soporte
            </Button>
         </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">&copy; {new Date().getFullYear()} Zone-Digital EdTech. Pagos Seguros SSL.</p>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} removeFromCart={removeFromCart} clearCart={() => setCart([])} />
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} initialBookId={modalBookId} initialMode={modalMode} />
    </div>
  );
};

export default App;