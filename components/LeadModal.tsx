import React, { useState, useEffect } from 'react';
import { X, CheckCircle, BookOpen, Headphones } from 'lucide-react';
import { Button } from './ui/Button';
import { submitLead } from '../services/api';
import { analytics } from '../services/analytics';
import { PRODUCTS, SPOTIFY_PODCAST_URL } from '../constants';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookId?: string; // Pre-select a book if opened from a specific card
  initialMode?: 'pdf' | 'audio';
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, initialBookId, initialMode = 'pdf' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedBook, setSelectedBook] = useState(initialBookId || PRODUCTS[0].id);
  const [mode, setMode] = useState<'pdf' | 'audio'>(initialMode);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedBook(initialBookId || PRODUCTS[0].id);
      setMode(initialMode);
      setStatus('idle');
    }
  }, [isOpen, initialBookId, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Track event
    analytics.track({ 
      event: 'lead', 
      data: { 
        interest: selectedBook, 
        type: mode 
      } 
    });

    // Save Lead to DB/Sheets
    await submitLead({ 
      name, 
      email, 
      interest: "Lead Magnet", 
      consent: true,
      bookId: selectedBook,
      type: mode
    });

    if (mode === 'audio') {
      // Redirect logic for podcast
      window.open(SPOTIFY_PODCAST_URL, '_blank');
      onClose();
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10">
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Enviado!</h3>
            <p className="text-slate-600 mb-6">Revisa tu bandeja de entrada ({email}). Te hemos enviado el capítulo gratuito.</p>
            <Button onClick={onClose} className="w-full">Volver a la tienda</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${mode === 'audio' ? 'bg-green-100 text-green-600' : 'bg-brand-100 text-brand-600'}`}>
                  {mode === 'audio' ? <Headphones size={24} /> : <BookOpen size={24} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {mode === 'audio' ? 'Escucha el Resumen' : 'Capítulo Gratuito'}
                </h3>
              </div>
              <p className="text-sm text-slate-500">
                {mode === 'audio' 
                  ? 'Accede al podcast exclusivo en Spotify.' 
                  : 'Recibe una muestra del contenido en tu email.'}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                  <button
                    type="button"
                    onClick={() => setMode('pdf')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'pdf' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Leer PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('audio')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'audio' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Escuchar Audio
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Selecciona el Libro</label>
                  <select 
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tu Nombre</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="Ej. Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tu Mejor Email</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="alex@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="flex items-start gap-2 text-xs text-slate-500 mt-2">
                  <input type="checkbox" required className="mt-0.5 rounded text-brand-600 focus:ring-brand-500" />
                  <span>Acepto unirme a la comunidad Zone-Digital.</span>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full mt-4 ${mode === 'audio' ? 'bg-green-600 hover:bg-green-500 shadow-green-500/30' : ''}`} 
                  size="lg" 
                  isLoading={status === 'loading'}
                >
                  {mode === 'audio' ? 'Ir a Spotify Ahora' : 'Enviar Capítulo Gratis'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};